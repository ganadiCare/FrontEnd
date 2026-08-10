import React, { useState, useRef, useEffect } from 'react';
import '../css/report.css';

// DatePicker 컴포넌트에 전달되는 props 타입 정의
interface CalenderProps {
  selectedDate: string; // 현재 선택된 날짜 (YYYY-MM-DD 형식, 없으면 '')
  onChange: (date: string) => void; // 날짜 선택 시 호출되는 콜백
  disabled?: boolean; // true이면 달력 열기 불가
  maxDate?: string; // YYYY-MM-DD, 이 날짜 이후는 선택 불가 (미래 날짜 제한)
  reportDates?: string[]; // 리포트가 존재하는 날짜 목록 (YYYY-MM-DD), 숫자 색을 다르게 표시
}

// 요일 헤더 텍스트 (일요일부터 토요일 순)
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 오늘 날짜를 로컬 시간 기준 YYYY-MM-DD 형식으로 반환하는 유틸 함수 (toISOString은 UTC라 자정~오전9시 KST에 날짜가 하루 밀림)
const todayStr = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const Calender: React.FC<CalenderProps> = ({ selectedDate, onChange, disabled, maxDate, reportDates }) => {
  // 달력 팝업 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);
  // 초기 표시 연도·월: 선택된 날짜 기준, 없으면 오늘 기준
  const base = selectedDate ? new Date(selectedDate) : new Date();
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [viewMonth, setViewMonth] = useState(base.getMonth());

  const triggerRef = useRef<HTMLDivElement>(null);
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

  // ─── 달력 아이콘 클릭 → 팝업 열기/닫기 ────────────────────────────────────
  // 트리거 위치를 기준으로 팝업을 아래 또는 위에 배치하고,
  // 앱 프레임 너비(최대 300px)에 맞게 오른쪽 정렬
  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(o => !o);
    console.log('open calender '+ isOpen)
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

  // 다음 달로 이동 (12월이면 다음 연도 1월로 전환, maxDate 초과 시 차단)
  const handleNextMonth = () => {
    if (isNextMonthBlocked()) return;
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // 다음 연도로 이동 (maxDate 연도 초과 시 최신월로 전환)
  const handleNextYear = () => {
    if (!maxDate) {
      setViewYear(y => y + 1);
      return;
    }
    const max = new Date(maxDate);
    const nextYear = viewYear + 1;
    const maxYear = max.getFullYear();
    const maxMonth = max.getMonth();

    if (nextYear > maxYear || (nextYear === maxYear && viewMonth > maxMonth)) {
      setViewYear(maxYear);
      setViewMonth(maxMonth);
      return;
    }
    setViewYear(nextYear);
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
    const reportDateSet = new Set(reportDates);
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
      const hasReport = reportDateSet.has(dateStr);                 // 리포트가 존재하는 날짜

      cells.push(
        <div
          key={day}
          className={`dp-cell dp-day${isSelected ? ' dp-selected' : ''}${isToday && !isSelected ? ' dp-today' : ''}${isFuture ? ' dp-future' : ''}${hasReport && !isSelected ? ' dp-has-report' : ''}`}
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

  return (
    // 달력 아이콘(트리거) 래퍼 - 클릭 시 팝업 열기
    <div className="dp-wrapper" ref={triggerRef}>
      <div className={`dp-trigger${disabled ? ' dp-disabled' : ''}`} onClick={handleOpen}>
        <span className="date-text">{selectedDate?.replace(/-/g, '.') ?? '.'}</span>
      </div>
      {isOpen && 
        <div className="dp-popup" ref={popupRef}>
          <div className="dp-header">
            <button className="dp-nav-btn" onClick={handlePrevYear}>{'«'}</button>
            <button className="dp-nav-btn" onClick={handlePrevMonth}>{'‹'}</button>
            <span className="dp-month-label">{viewYear}년 {viewMonth + 1}월</span>
            <button className={isNextMonthBlocked() ? 'dp-nav-btn disabled' : 'dp-nav-btn'} onClick={handleNextMonth}>{'›'}</button>
            <button className={isNextMonthBlocked() ? 'dp-nav-btn disabled' : 'dp-nav-btn'} onClick={handleNextYear}>{'»'}</button>
          </div>
          <div className="dp-grid">
            {DAYS.map(d => (
              <div key={d} className="dp-cell dp-day-name">{d}</div>
            ))}
            {renderCells()}
          </div>
        </div>
      }
    </div>
  );
};

export default Calender;
