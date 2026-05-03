import React, {useState, useRef} from 'react';
import '../css/gallery.css';

interface ThumbnailProps {
    url?: string;
    checkOn?: boolean;
    onThumbnailClick:(state: string) => void;
    onThumbnailPress: (state: boolean) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = (
{
    url='', checkOn=false,
    onThumbnailClick, onThumbnailPress
}) => {
    const [checked, setChecked] = useState(false);
    const timerRef = useRef<number | null>(null);
    const pressRef = useRef(false);

    const startPress = () => {
        timerRef.current = window.setTimeout(() => {
            pressRef.current = true;
            onThumbnailPress(true)
            setChecked(true);
        }, 500);
    };

    const endPress = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const checkThumbnail =() => {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }

    const clickThumbnail = () =>{
        if (pressRef.current) { return;
        } else if (checkOn) {
            checkThumbnail();
        } else {
           onThumbnailClick('gallery-detail');
        }
    }

    return (
        <div
            className='thumbnail-wrapper'
            onClick={clickThumbnail}
            onMouseDown={startPress} 
            onMouseUp={endPress}
            onMouseLeave={endPress}
        >
            <img className='thumbnail-image' src={url} alt={url} />
            <input type="checkbox" aria-label={url}
                className={checkOn==true ? 'thumbnail-check' : 'thumbnail-check hide'}
                checked={checked}
                onClick={checkThumbnail}
            />
        </div>
    );
};

export default Thumbnail;