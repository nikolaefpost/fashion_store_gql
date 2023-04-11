import React from 'react';

import styles from "./catalog.module.scss";

const Sidebar = ({category, sort}) => {
    return (
        <div className={styles.sidebar}>
            {category && category.map(item=>(
                <span
                    key={item.category}
                    onClick={()=>sort(item.category)}
                >{item.category}</span>
            ))}
        </div>
    );
};

export default Sidebar;