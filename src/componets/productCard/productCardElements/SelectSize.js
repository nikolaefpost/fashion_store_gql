import React from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";

import styles from "../productCard.module.scss";
import {useLanguage} from "../../../context/setting";

const SelectSize = ({openSelect, setOpenSelect, sizeProduct, setSizeProduct, sizeError, setSizeError, size}) => {
    const {text} = useLanguage();
    const handleSetSizeProduct = (el) => {
        setSizeProduct(el);
        setSizeError(false)
    }

    return (
        <div className={cn(styles.select, {[styles.error_select]: sizeError})} onClick={() => setOpenSelect(pre => !pre)}>
            {sizeProduct}
            <span className={cn(styles.svg, {[styles.active_svg]: openSelect})}><AiOutlineRight/></span>
            {openSelect && <ul>
                {size.map(el => (
                    <li key={el} onClick={() => handleSetSizeProduct(el)}>{el}</li>
                ))}
            </ul>}
            {sizeError && <div className={styles.error}>{text.select_size}!</div>}
        </div>
    );
};

export default SelectSize;