import React from 'react';
import '../css/graph.css';

interface RingGraphProps {
    icon?: string;
    text?: string;
    currentValue?: number;
    fullValue?: number;
}

const RingGraph: React.FC<RingGraphProps> = (
{
    icon, text, currentValue=0, fullValue=100
}) => {
    const ratio = fullValue>0 ? Math.min(currentValue / fullValue, 1) : 0;
    const ringColor = ratio>0.25 ? '#0099FF': '#FF0000';

    return (
        <div className="ring-wrapper">
            <div className="ring-progress">
                <img
                    className='ring-icon'
                    src={icon}
                    alt='icon'
                />

                <svg className="ring-outer" width='56px' height='56px'>
                    <circle className='ring-base'
                    cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                    <circle className='ring-gage' 
                    cx="28" cy="28" r="24" stroke={ringColor} strokeWidth="4" fill="none" 
                    strokeDasharray="150" strokeDashoffset={150*(1-ratio)} strokeLinecap="round" transform="rotate(-90 28 28)" />
                </svg>
            </div>
            <span className="ring-text">{text}</span>
        </div>
    );
};

export default RingGraph;