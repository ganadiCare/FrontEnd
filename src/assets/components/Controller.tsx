import React, { useRef } from 'react';
import '../css/controller.css'

interface ControllerProps {
    isFull?: boolean;
    isManual?: boolean;
    onDirectionClick: (state: string) => void;
    sendControl: (cmd: object) => void;
}

const Controller: React.FC<ControllerProps> = (
{
    isFull=false, isManual=true, onDirectionClick, sendControl
}) => {
    const moveTimer = useRef<number | null>(null);

    const directions = [
        { key: 'top', angle: 0, pan: 0, tilt: 1 },
        { key: 'right', angle: 90, pan: -1, tilt: 0 },
        { key: 'bottom', angle: 180, pan: 0, tilt: -1 },
        { key: 'left', angle: 270, pan: 1, tilt: 0 },
    ];

    const startMove = (key: string, pan: number, tilt: number) => {
        if (!isManual) {
            alert("먼저 수동 모드로 변경해주세요.");
            return;
        }
        onDirectionClick(key);

        if (moveTimer.current) clearInterval(moveTimer.current);
        sendControl({ cmd: 'move', pan, tilt });
        moveTimer.current = setInterval(() => {
            sendControl({ cmd: 'move', pan, tilt });
        }, 200);
    };

    const stopMove = () => {
        if (moveTimer.current) {
            clearInterval(moveTimer.current);
            moveTimer.current = null;
        }
        onDirectionClick('center');
        sendControl({ cmd: 'stop' });
    };

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
                        onPointerDown={(e) => {
                            e.preventDefault();
                            e.currentTarget.setPointerCapture(e.pointerId); 
                            startMove(dir.key, dir.pan, dir.tilt);
                        }}
                        onPointerUp={(e) => {
                            e.preventDefault();
                            e.currentTarget.releasePointerCapture(e.pointerId);
                            stopMove();
                        }}
                        onPointerCancel={stopMove}
                    />
                ))}

                <circle className='direction-center' cx="100" cy="100" r="45" fill="#999"/>
            </svg>
        </div>
    );
};

export default Controller;