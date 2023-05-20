import React, {useEffect, useState} from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import {useLanguage} from "../../../context/setting";

import styles from "./mobileCatalog.module.scss";

const MobilSidebar = ({category, sort, current}) => {
    const {text, lang} = useLanguage();
    const [currentCategory, setCurrentCategory] = useState(text.catalog);
    const [openSelect, setOpenSelect] = useState(false);

    const handleSetCategory = (cat) => {
        sort(cat);
        setCurrentCategory(cat);
    }

    useEffect(()=>{
        if (current === "") setCurrentCategory(text.catalog)
    },[current])
    return (
        <div className={styles.sidebar} onClick={() => setOpenSelect(pre => !pre)}>
            <div className={styles.current}>
                {currentCategory}
                <span className={cn(styles.svg, {[styles.active_svg]: openSelect})}><AiOutlineRight/></span>
            </div>

            {openSelect && <ul>
                {category && category.map(el => (
                    <li
                        key={el.category}
                        onClick={() => handleSetCategory(lang === "Eng" ? el.category : el.category_ua)}
                    >
                        {lang === "Eng" ? el.category : el.category_ua}
                    </li>
                ))}
            </ul>}
        </div>
    );
};

export default MobilSidebar;