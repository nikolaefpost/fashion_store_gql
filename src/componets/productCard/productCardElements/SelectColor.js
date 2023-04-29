import React from 'react';
import cn from "classnames";
import {useLanguage} from "../../../context/setting";

import styles from "../productCard.module.scss";



const SelectColor = ({colorProduct, setColorProduct, color}) => {
    const {lang} = useLanguage();
    return (
        <>
            <div className={styles.color_block}>
                {color?.map(el=>(
                    <div
                        key={el.id}
                        className={cn(styles.color_el, styles[el.id], {[styles.selected_color]:el.id === colorProduct.id})}
                        onClick={()=>setColorProduct(el)}
                    />
                ))}
            </div>
            <div className={styles.color_text}>
                Color: {lang === "Eng"? colorProduct.color: colorProduct.color_ua}
            </div>

        </>
    );
};

export default SelectColor;