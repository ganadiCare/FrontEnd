import React from 'react';
import '../css/graph.css';

interface BarGraphProps {
    values?: number[];
}

const BarGraph: React.FC<BarGraphProps> = (
{
    values=[24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
}) => {
    const getColors=(values: number[]): string[]=>{
        const max = Math.max(...values);
        const min = Math.min(...values);
        const range = max-min;
        return values.map((value)=>{
            if (range==0) return 'rgba(0, 153, 255, 0)';
            const ratio = (value-min)/range;
            return `rgba(0, 153, 255, ${ratio})`;
        });
    };
    const colors = getColors(values);

    return (
        <div className="bar-wrapper">
            <svg className='bar-base' width='266px' height='30px' viewBox='0 0 264 30'>
                {Array.from({length: 24}).map((_, i)=>{
                    const color = colors[i];
                    return (
                        <rect
                            className='bar-gage'
                            x={i*11}
                            y='0'
                            rx='2'
                            width='10px'
                            height='30px'
                            fill={color}
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