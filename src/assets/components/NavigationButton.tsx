import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NavigationButton.css'; 

interface NavigationButtonProps {
  text: string;
  navigateTo?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; 
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  text, 
  navigateTo, 
  onClick, 
  disabled = false
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <button 
      className="nav-button" 
      onClick={handleClick}
      disabled={disabled} 
    >
      {text}
    </button>
  );
};

export default NavigationButton;