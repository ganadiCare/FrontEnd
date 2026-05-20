import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../css/datepicker.css';

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD or ''
  onChange: (date: string) => void;
  disabled?: boolean;
  maxDate?: string; // YYYY-MM-DD, 이 날짜 이후는 선택 불가
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const todayStr = () => new Date().toISOString().split('T')[0];

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, disabled, maxDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});

  const base = selectedDate ? new Date(selectedDate) : new Date();
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [viewMonth, setViewMonth] = useState(base.getMonth());

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [selectedDate]);

  const POPUP_HEIGHT = 300;
  const MARGIN = 16;

  const handleOpen = () => {
    if (disabled) return;
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const showAbove = spaceBelow < POPUP_HEIGHT;

      // 팝업 너비 고정, 앱 프레임 오른쪽 끝에서 MARGIN만큼 안쪽으로 정렬
      const popupWidth = 300;
      const frameWidth = Math.min(window.innerWidth, 300);
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

  const handlePrevYear = () => setViewYear(y => y - 1);

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const isNextMonthBlocked = () => {
    if (!maxDate) return false;
    const max = new Date(maxDate);
    return viewYear > max.getFullYear() ||
      (viewYear === max.getFullYear() && viewMonth >= max.getMonth());
  };

  const isNextYearBlocked = () => {
    if (!maxDate) return false;
    return viewYear >= new Date(maxDate).getFullYear();
  };

  const handleNextMonth = () => {
    if (isNextMonthBlocked()) return;
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleNextYear = () => {
    if (isNextYearBlocked()) return;
    setViewYear(y => y + 1);
  };

  const handleDayClick = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    onChange(`${viewYear}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const renderCells = () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const today = todayStr();
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`e-${i}`} className="dp-cell" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const mm = String(viewMonth + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const dateStr = `${viewYear}-${mm}-${dd}`;
      const isSelected = selectedDate && dateStr === selectedDate;
      const isToday = dateStr === today;
      const isFuture = maxDate ? dateStr > maxDate : false;

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

  const popup = isOpen ? ReactDOM.createPortal(
    <div className="dp-popup" style={popupStyle} ref={popupRef}>
      <div className="dp-header">
        <button className="dp-nav-btn" onClick={handlePrevYear}>{'«'}</button>
        <button className="dp-nav-btn" onClick={handlePrevMonth}>{'‹'}</button>
        <span className="dp-month-label">{viewYear}년 {viewMonth + 1}월</span>
        <button className={`dp-nav-btn${isNextMonthBlocked() ? ' dp-nav-disabled' : ''}`} onClick={handleNextMonth}>{'›'}</button>
        <button className={`dp-nav-btn${isNextYearBlocked() ? ' dp-nav-disabled' : ''}`} onClick={handleNextYear}>{'»'}</button>
      </div>
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
    <div className="dp-wrapper" ref={triggerRef}>
      <div className={`dp-trigger${disabled ? ' dp-disabled' : ''}`} onClick={handleOpen}>
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
