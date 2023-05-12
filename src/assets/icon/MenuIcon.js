import React from 'react';

const MenuIcon = ({color, className}) => {
    return (
        <svg
            className={className}
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill={color}
        >
            <rect width="34" height="4" />
            <rect y="10" width="26" height="4" />
            <rect y="20" width="18" height="4" />
        </svg>
    );
};

export default MenuIcon;