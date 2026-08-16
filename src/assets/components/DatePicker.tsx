import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../css/datepicker.css';

// DatePicker 컴포넌트에 전달되는 props 타입 정의
interface DatePickerProps {
  selectedDate: string; // 현재 선택된 날짜 (YYYY-MM-DD 형식, 없으면 '')
  onChange: (date: string) => void; // 날짜 선택 시 호출되는 콜백
  disabled?: boolean; // true이면 달력 열기 불가
  maxDate?: string; // YYYY-MM-DD, 이 날짜 이후는 선택 불가 (미래 날짜 제한)
}

// 요일 헤더 텍스트 (일요일부터 토요일 순)
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환하는 유틸 함수
const todayStr = () => new Date().toISOString().split('T')[0];

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, disabled, maxDate }) => {
  // 달력 팝업 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);
  // 팝업의 위치/크기를 동적으로 계산하여 적용할 인라인 스타일
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  // 초기 표시 연도·월: 선택된 날짜 기준, 없으면 오늘 기준
  const base = selectedDate ? new Date(selectedDate) : new Date();
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [viewMonth, setViewMonth] = useState(base.getMonth());

  // 달력 아이콘(트리거) DOM 참조 - 팝업 위치 계산에 사용
  const triggerRef = useRef<HTMLDivElement>(null);
  // 팝업 DOM 참조 - 외부 클릭 감지에 사용
  const popupRef = useRef<HTMLDivElement>(null);

  // ─── 외부 클릭 시 팝업 닫기 ───────────────────────────────────────────────
  // 팝업이 열려 있을 때만 mousedown 이벤트를 등록하고,
  // 트리거 영역과 팝업 영역 밖을 클릭하면 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        popupRef.current && !popupRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ─── 선택 날짜 변경 시 달력 뷰 동기화 ──────────────────────────────────────
  // 부모에서 selectedDate가 바뀌면 달력이 해당 연도·월로 이동
  useEffect(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [selectedDate]);

  // 팝업 높이 기준값 (화면 아래 공간이 이보다 좁으면 위쪽에 표시)
  const POPUP_HEIGHT = 300;
  const MARGIN = 16;

  // ─── 달력 아이콘 클릭 → 팝업 열기/닫기 ────────────────────────────────────
  // 트리거 위치를 기준으로 팝업을 아래 또는 위에 배치하고,
  // 앱 프레임 너비(최대 300px)에 맞게 오른쪽 정렬
  const handleOpen = () => {
    if (disabled) return;
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const showAbove = spaceBelow < POPUP_HEIGHT; // 아래 공간 부족 시 위에 표시

      // 팝업 너비 고정, 앱 프레임 오른쪽 끝에서 MARGIN만큼 안쪽으로 정렬
      const popupWidth = 300;
      const frameWidth = Math.min(window.innerWidth, 412);
      const frameLeft = (window.innerWidth - frameWidth) / 2;
      const leftPos = frameLeft + frameWidth - popupWidth - MARGIN;

      setPopupStyle({
        position: 'fixed',
        left: leftPos,
        width: popupWidth,
        zIndex: 9999,
        ...(showAbove
          ? { bottom: window.innerHeight - rect.top + MARGIN / 2 }
          : { top: rect.bottom + MARGIN / 2 }),
      });
    }
    setIsOpen(o => !o);
  };

  // ─── 연도·월 이동 핸들러 ─────────────────────────────────────────────────
  const handlePrevYear = () => setViewYear(y => y - 1);

  // 이전 달로 이동 (1월이면 전년도 12월로 전환)
  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  // maxDate 기준으로 다음 달 이동이 막혀야 하는지 확인
  const isNextMonthBlocked = () => {
    if (!maxDate) return false;
    const max = new Date(maxDate);
    return viewYear > max.getFullYear() ||
      (viewYear === max.getFullYear() && viewMonth >= max.getMonth());
  };

  // maxDate 기준으로 다음 연도 이동이 막혀야 하는지 확인
  const isNextYearBlocked = () => {
    if (!maxDate) return false;
    return viewYear >= new Date(maxDate).getFullYear();
  };

  // 다음 달로 이동 (12월이면 다음 연도 1월로 전환, maxDate 초과 시 차단)
  const handleNextMonth = () => {
    if (isNextMonthBlocked()) return;
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // 다음 연도로 이동 (maxDate 연도 초과 시 차단)
  const handleNextYear = () => {
    if (isNextYearBlocked()) return;
    setViewYear(y => y + 1);
  };

  // ─── 날짜 셀 클릭 → 선택 처리 ────────────────────────────────────────────
  // YYYY-MM-DD 형식으로 변환 후 onChange 호출, 팝업 닫기
  const handleDayClick = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    onChange(`${viewYear}-${mm}-${dd}`);
    setIsOpen(false);
  };

  // ─── 달력 날짜 셀 렌더링 ──────────────────────────────────────────────────
  const renderCells = () => {
    // 해당 월의 총 일수와 1일의 요일(0=일 ~ 6=토)
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const today = todayStr();
    const cells: React.ReactNode[] = [];

    // 1일 이전 빈 셀로 요일 자리 맞춤
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`e-${i}`} className="dp-cell" />);
    }

    // 실제 날짜 셀 렌더링
    for (let day = 1; day <= daysInMonth; day++) {
      const mm = String(viewMonth + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const dateStr = `${viewYear}-${mm}-${dd}`;
      const isSelected = selectedDate && dateStr === selectedDate; // 선택된 날짜
      const isToday = dateStr === today;                           // 오늘 날짜
      const isFuture = maxDate ? dateStr > maxDate : false;        // 선택 불가 미래 날짜

      cells.push(
        <div
          key={day}
          className={`dp-cell dp-day${isSelected ? ' dp-selected' : ''}${isToday && !isSelected ? ' dp-today' : ''}${isFuture ? ' dp-future' : ''}`}
          onClick={isFuture ? undefined : () => handleDayClick(day)}
        >
          {day}
        </div>
      );
    }

    // 항상 6행(42칸)으로 고정하여 월마다 크기가 달라지지 않도록 패딩
    const totalCells = firstDay + daysInMonth;
    const remaining = 42 - totalCells;
    for (let i = 0; i < remaining; i++) {
      cells.push(<div key={`tail-${i}`} className="dp-cell" />);
    }

    return cells;
  };

  // ─── 팝업을 document.body에 포털로 렌더링 ────────────────────────────────
  // z-index 충돌 없이 최상단에 표시하기 위해 createPortal 사용
  const popup = isOpen ? ReactDOM.createPortal(
    <div className="dp-popup" style={popupStyle} ref={popupRef}>
      {/* 연도·월 네비게이션 헤더 */}
      <div className="dp-header">
        <button className="dp-nav-btn" onClick={handlePrevYear}>{'«'}</button>
        <button className="dp-nav-btn" onClick={handlePrevMonth}>{'‹'}</button>
        <span className="dp-month-label">{viewYear}년 {viewMonth + 1}월</span>
        <button className={`dp-nav-btn${isNextMonthBlocked() ? ' dp-nav-disabled' : ''}`} onClick={handleNextMonth}>{'›'}</button>
        <button className={`dp-nav-btn${isNextYearBlocked() ? ' dp-nav-disabled' : ''}`} onClick={handleNextYear}>{'»'}</button>
      </div>
      {/* 요일 헤더 + 날짜 셀 그리드 */}
      <div className="dp-grid">
        {DAYS.map(d => (
          <div key={d} className="dp-cell dp-day-name">{d}</div>
        ))}
        {renderCells()}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    // 달력 아이콘(트리거) 래퍼 - 클릭 시 팝업 열기
    <div className="dp-wrapper" ref={triggerRef}>
      <div className={`dp-trigger${disabled ? ' dp-disabled' : ''}`} onClick={handleOpen}>
        {/* 달력 SVG 아이콘 */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      {popup}
    </div>
  );
};

export default DatePicker;
