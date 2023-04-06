import React from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";

import styles from "../productCard.module.scss";

const size = ["XXS", "XS", "S", "M", "L"];

const SelectSize = ({openSelect, setOpenSelect, sizeProduct, setSizeProduct, sizeError, setSizeError}) => {

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
            {sizeError && <div className={styles.error}>Выберите размер!</div>}
        </div>
    );
};

export default SelectSize;