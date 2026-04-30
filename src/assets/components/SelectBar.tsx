import React from 'react';
import '../css/select.css';

interface SelectBarProps {
  options?: string[];
  selectedValue?: string;
  onSelectClick?: (option: string) => void;
}

const SelectBar: React.FC<SelectBarProps> = (
{
  options=[], selectedValue,
  onSelectClick
}) => {
  const clickNext=() =>{
    const index = options?.indexOf(selectedValue||'');
    if (index < options?.length-1){
      selectedValue=options?.[index+1];
      onSelectClick?.(selectedValue);
    }
  }

  const clickPrevious=() =>{
    const index = options?.indexOf(selectedValue||'');
    if (index > 0){
      selectedValue=options?.[index-1];
      onSelectClick?.(selectedValue);
    }
  }

  return (
    <section className='select-bar'>
      <svg className='select-button' onClick={clickPrevious}
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 7L9 12L14 17"/>
      </svg>

      <select
        className='select-box'
        id='select'
        aria-label='select'
        value={selectedValue}
        onChange={(e)=>onSelectClick?.(e.target.value)}
      >
        {options?.map(option=>(
          <option
            key={option}
            value={option}
          >{option}</option>
        ))}
      </select>

      <svg className='select-button' onClick={clickNext}
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 17L15 12L10 7"/>
      </svg>
    </section>
  );
};

export default SelectBar;