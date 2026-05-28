import React from 'react';
import '../css/graph.css';

interface BarGraphProps {
    values?: number[];
}

const BarGraph: React.FC<BarGraphProps> = (
{
    values=[24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
}) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;

    const getRatio = (value: number) => range === 0 ? 0 : (value - min) / range;

    return (
        <div className="bar-wrapper">
            <svg className='bar-base' width='266px' height='30px' viewBox='0 0 264 30'>
                {Array.from({length: 24}).map((_, i) => {
                    const ratio = getRatio(values[i]);
                    const fill = `rgba(0, 153, 255, ${ratio})`;
                    const isEmpty = ratio <= 0.3;
                    return (
                        <rect
                            key={i}
                            className='bar-gage'
                            x={i * 11}
                            y='0'
                            rx='2'
                            width='10px'
                            height='30px'
                            fill={fill}
                            stroke={isEmpty ? 'rgba(0, 153, 255, 0.25)' : 'none'}
                            strokeWidth={isEmpty ? '0.8' : '0'}
                        />
                    );
                })};
            </svg>
            <svg className='bar-stamp' width='266px' height='8px' viewBox='0 0 264 8'>
                <text x={0*11} y='10'>0</text>
                <text x={6*11} y='10'>6</text>
                <text x={12*11} y='10'>12</text>
                <text x={18*11} y='10'>18</text>
                <text x={24*11} y='10'>24</text>
            </svg>
        </div>
    );
};

export default BarGraph;