import React from 'react';
import '../css/select.css';

interface Option{
  id: number;
  name: string;
}

interface SelectBarProps {
  options?: Array<Option>;
  selectedValue?: Option;
  visible?: boolean
  onSelectClick?: (option: Option) => void;
}

const SelectBar: React.FC<SelectBarProps> = (
{
  options=[], selectedValue, visible=true,
  onSelectClick
}) => {
  const clickNext=() =>{
    const index = options?.findIndex(opt => opt.id === selectedValue?.id);
    if (index < options?.length-1){
      selectedValue=options?.[index+1];
      onSelectClick?.(selectedValue);
    }
  }

  const clickPrevious=() =>{
    const index = options?.findIndex(opt => opt.id === selectedValue?.id);
    if (index > 0){
      selectedValue=options?.[index-1];
      onSelectClick?.(selectedValue);
    }
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedOption = options.find(opt => opt.id === selectedId);
    
    if (selectedOption) {
      onSelectClick?.(selectedOption);
    }
  };

  return (
    <section className={visible ? 'select-bar' : 'select-bar hide'}>
      <svg className={options.length>0 && options?.findIndex(opt => opt.id === selectedValue?.id)!==0 ? 'select-button active' : 'select-button'}
      onClick={clickPrevious}
      width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 7L9 12L14 17"/>
      </svg>

      <select
        className='select-box'
        id='select'
        aria-label='select'
        value={selectedValue?.id}
        onChange={selectChange}
      >
        {options?.map(option=>(
          <option
            key={option?.id}
            value={option?.id}
          >{option.name}</option>
        ))}
      </select>

      <svg className={options.length>0 && options?.findIndex(opt => opt.id === selectedValue?.id)<options?.length-1 ? 'select-button active' : 'select-button'}
      onClick={clickNext}
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 17L15 12L10 7"/>
      </svg>
    </section>
  );
};

export default SelectBar;