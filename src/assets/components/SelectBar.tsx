import React from 'react';
import '../css/templete.css';

interface SelectBarProps {
  options?: string[];
  selectedValue?: string;

  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

const SelectBar: React.FC<SelectBarProps> = (
  {
    options, selectedValue,
    onPreviousClick, onNextClick
  }) => {
  return (
    <section className='select-bar'>
      <p className='select-button' onClick={onPreviousClick}>&lt;</p>
      <select
        className='select-box'
        id='select'
        aria-label='select'
        value={selectedValue}
      >
        {options?.map(option=>(
          <option
            key={option}
            value={option}
          >{option}</option>
        )
        )}
      </select>
      <p className='select-button' onClick={onNextClick}>&gt;</p>
    </section>
  );
};

export default SelectBar;