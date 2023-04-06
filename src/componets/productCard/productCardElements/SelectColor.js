import React from 'react';
import cn from "classnames";

import styles from "../productCard.module.scss";

const color = [
    {id: "white", name: "Белый снег"},
    {id: "grey", name: "Мокрый асфальт"},
    {id: "beige", name: "Кофе с молоком меланж"}
]

const SelectColor = ({colorProduct, setColorProduct}) => {
    return (
        <>
            <div className={styles.color_block}>
                {color.map(el=>(
                    <div
                        key={el.id}
                        className={cn(styles.color_el, styles[el.id], {[styles.selected_color]:el.id === colorProduct.id})}
                        onClick={()=>setColorProduct(el)}
                    />
                ))}
            </div>
            <div className={styles.color_text}>
                Цвет: {colorProduct.name}
            </div>

        </>
    );
};

export default SelectColor;