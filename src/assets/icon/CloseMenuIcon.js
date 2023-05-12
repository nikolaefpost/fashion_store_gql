import React from 'react';

const CloseMenuIcon = ({color, className}) => {
    return (
        <svg className={className} width="28" height="27" viewBox="0 0 28 27" fill={color} xmlns="http://www.w3.org/2000/svg">
            <rect x="3" width="34" height="4" transform="rotate(45 3 0)" />
            <rect y="24.0416" width="34" height="4" transform="rotate(-45 0 24.0416)" />
        </svg>

    );
};

export default CloseMenuIcon;