import React from 'react';
import '../css/inputbox.css';

// 1. 여기서 받을 수 있는 속성(Props)들의 이름을 미리 등록해줘야 합니다.
interface InputboxProps {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
  onBlur?: () => void;      // 👈 추가: 포커스가 나갈 때 실행할 함수
  sideButtonText?: string;
  onSideButtonClick?: () => void;
  type?: string;           // 👈 추가: password 등을 처리하기 위함
  className?: string;      // 👈 추가: 에러 시 빨간 테두리 클래스 등을 받기 위함
  disabled?: boolean;      // 👈 추가: 입력창 비활성화 여부
  suffix?: string;         // 입력값 뒤에 표시할 단위 텍스트 (예: kg)
}

const Inputbox: React.FC<InputboxProps> = ({
  placeholder,
  value,
  onChange,
  onClear,
  onBlur,
  sideButtonText,
  onSideButtonClick,
  type = "text", // 기본값은 text
  className = "",
  disabled = false,
  suffix,
}) => {
  return (
    // 2. 전달받은 className을 컨테이너에 적용합니다.
    <div className={`input-container ${className}`}>
      <div className={`input-wrapper ${disabled ? 'disabled' : ''}`}>
        <input
          className="input-main"
          type={type}       // 👈 type 적용
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}   // 👈 onBlur 이벤트 연결
          disabled={disabled} // 👈 disabled 적용
        />
        
        {suffix && value && (
          <span className="input-suffix">{suffix}</span>
        )}

        {value && onClear && !disabled && (
          <div className="clear-icon" onClick={onClear}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        )}
      </div>

      {sideButtonText && (
        <button className="side-button" onClick={onSideButtonClick} type="button" disabled={disabled}>
          {sideButtonText}
        </button>
      )}
    </div>
  );
};

export default Inputbox;