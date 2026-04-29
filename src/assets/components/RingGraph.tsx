import React from 'react';
import '../css/graph.css';

interface RingGraphProps {
    graphName?: string;
    currentValue?: number;
    fullValue?: number;
}

const RingGraph: React.FC<RingGraphProps> = (
{
    graphName, currentValue=50, fullValue=100
}) => {
    const ratio = fullValue>0 ? currentValue / fullValue : 0;
    const ringColor = ratio>0.25 ? '#0099FF': '#FF0000';

    return (
        <div className="ring-wrapper">
            <div className="ring-progress">
                <svg className="ring-inner" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle><path d="M8 9.05v-.1"></path><path d="M16 9.05v-.1"></path><path d="M16 14c-1.5 1.5-6.5 1.5-8 0"></path>
                </svg>

                <svg className="ring-outer" width='56px' height='56px'>
                    <circle className='ring-base'
                    cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                    <circle className='ring-gage' 
                    cx="28" cy="28" r="24" stroke={ringColor} strokeWidth="4" fill="none" 
                    strokeDasharray="150" strokeDashoffset={150*(1-ratio)} strokeLinecap="round" transform="rotate(-90 28 28)" />
                </svg>
            </div>
            <span className="ring-text">{graphName}</span>
        </div>
    );
};

export default RingGraph;