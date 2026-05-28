import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/gallery.css';

interface MediaThumbnail{
    mediaId: number;
    url: string;
    createAt: string;
}

interface ThumbnailProps {
    mediaThumbnail?: MediaThumbnail;
    checkOn?: boolean;
    isSelected?: boolean;
    onThumbnailPress: (id: number) => void;
    onSelect: (id: number) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = (
{
    mediaThumbnail, checkOn=false, isSelected=false,
    onThumbnailPress, onSelect
}) => {
    const navigate = useNavigate()
    const timerRef = useRef<number | null>(null);
    const pressRef = useRef(false);

    const startPress = () => {
        timerRef.current = window.setTimeout(() => {
            pressRef.current = true;
            onThumbnailPress(mediaThumbnail?.mediaId ?? -1);
            onSelect(mediaThumbnail?.mediaId ?? -1);
        }, 500);
    };

    const endPress = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const clickThumbnail = () =>{
        if (pressRef.current) { 
            pressRef.current = false;
            return;
        } else if (checkOn) {
            onSelect(mediaThumbnail?.mediaId ?? -1);
        } else {
           navigate(`/gallery/detail/${mediaThumbnail?.mediaId}`)
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
            <img className='thumbnail-image' src={mediaThumbnail?.url} alt={mediaThumbnail?.url} />
            <input type="checkbox" aria-label={mediaThumbnail?.url} readOnly
                className={checkOn==true ? 'thumbnail-check' : 'thumbnail-check hide'}
                checked={isSelected}
                onChange={() => onSelect(mediaThumbnail?.mediaId ?? -1)}
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

export default Thumbnail;