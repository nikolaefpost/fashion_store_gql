import React from 'react';
import cn from "classnames";

import styles from "../productCard.module.scss";


const SelectColor = ({colorProduct, setColorProduct, color}) => {
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
                Color: {colorProduct.color}
            </div>

        </>
    );
};

export default SelectColor;