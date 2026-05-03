import React from 'react';
import '../css/profile.css';

interface ProfileImageProps {
    src?: string;
    onEditClick?: void;
}

const ProfileImage: React.FC<ProfileImageProps> = (
{
    src='',
    onEditClick
}) => {
    return (
        <div className="profile-wrapper">
            <img
                className="profile-image" 
                src={src}
                alt="profile image"
            />
            <div className="edit-badge" onClick={()=>onEditClick}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            </div>
        </div>
    );
};

export default ProfileImage;