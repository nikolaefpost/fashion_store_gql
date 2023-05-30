import React from 'react';
import {useLanguage} from "../../../context/setting";

import styles from "../catalog.module.scss";


const DesktopSidebar = ({category, sort}) => {
    const {text, lang} = useLanguage();
    return (
        <>
            <div className={styles.title}>{text.catalog}</div>
            <div className={styles.sidebar}>
                {category && category.map(item => (
                    <span
                        key={item.category}
                        onClick={() => sort(item)}
                    >{lang === "Eng" ? item.category : item.category_ua}</span>
                ))}
            </div>
        </>
    );
};

export default DesktopSidebar;