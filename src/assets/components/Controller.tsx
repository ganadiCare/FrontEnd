import React from 'react';
import '../css/controller.css'

interface ControllerProps {
    isFull?: boolean;
    onDirectionClick: (state: string) => void;
}

const Controller: React.FC<ControllerProps> = (
{
    isFull=false, onDirectionClick
}) => {
    const directions = [
        { key: 'top', angle: 0 },
        { key: 'right', angle: 90 },
        { key: 'bottom', angle: 180 },
        { key: 'left', angle: 270 },
    ];

    return (
        <div className={!isFull? "controller-wrapper" : "controller-wrapper full"}>
            <svg className='direction-controller' width="200px" height="200px" viewBox="0 0 200 200">
                {directions.map((dir) => (
                    <path
                        key={dir.key}
                        className={`direction-part`}
                        d={"M 100 100 L 29.3 29.3 A 100 100 0 0 1 170.7 29.3 Z"}
                        stroke={!isFull? "#fff" : "#000"}
                        strokeWidth="10"
                        transform={`rotate(${dir.angle} 100 100)`}
                        onMouseDown={() => onDirectionClick?.(dir.key)}
                        onMouseUp={() => onDirectionClick?.('center')}
                    />
                ))}

                <circle className='direction-center' cx="100" cy="100" r="45" fill="#999"/>
            </svg>
        </div>
    );
};

export default Controller;