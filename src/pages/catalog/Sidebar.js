import React from 'react';
import {useLanguage} from "../../context/setting";

import styles from "./catalog.module.scss";


const Sidebar = ({category, sort}) => {
    const { lang } = useLanguage();
    return (
        <div className={styles.sidebar}>
            {category && category.map(item=>(
                <span
                    key={item.category}
                    onClick={()=>sort(item.category)}
                >{lang === "Eng"? item.category: item.category_ua}</span>
            ))}
        </div>
    );
};

export default Sidebar;