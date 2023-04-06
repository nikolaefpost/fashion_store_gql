import React from 'react';

import styles from "./catalog.module.scss";

const Sidebar = ({category, sort}) => {
    return (
        <div className={styles.sidebar}>
            {category.map(item=>(
                <span key={item} onClick={()=>sort(item)}>{item}</span>
            ))}
        </div>
    );
};

export default Sidebar;