import React from 'react';
import styles from "./catalog.module.scss";
import cn from "classnames";

import {resetFilter} from "../../appolo/operations/poducts/productStore";
import {useLanguage} from "../../context/setting";

const HeaderInfo = ({setOpenInfo, length, changePriseRange, currentColor, currentSize, inputMinMax, sortingOption}) => {
    const {text} = useLanguage();

    const reset = () => {
        setOpenInfo(false);
        resetFilter();
    }
    return (
        <div className={styles.info}>
            <div className={styles.info_title}>
                {text.selected} {length} {text.goods}
                <span className={cn(styles.selected, styles.reset)} onClick={reset}>{text.reset}</span>
            </div>
            {currentSize && <span className={styles.selected}>{currentSize}</span>}
            {currentColor && <div className={styles.selected_color}>
                <div className={cn(styles.circle, styles[currentColor])}/>
            </div>}
            {changePriseRange && <>
                <div className={styles.selected}>{text.from}:
                    <span>{inputMinMax.min}</span> {text.currency}.
                </div>
                <div className={styles.selected}> {text.to}:
                    <span>{inputMinMax.max}</span> {text.currency}.
                </div>
            </>}
            {sortingOption && <span className={styles.selected}>{sortingOption.name}</span>}
        </div>
    );
};

export default HeaderInfo;