import React from 'react';
import cn from "classnames";
import {useLanguage} from "../../context/setting";
import {useMediaQuery} from "../../hooks/useMediaQuery";

import styles from "./purchases.module.scss";


const PurchaseOrderCard = ({order}) => {
    const isTablet = useMediaQuery(1000);
    const {text, lang} = useLanguage();
    return (
        <div key={order.product.id} className={styles.product_position}>
            <div className={styles.title_block}>
                <div className={styles.image}>
                    <img src={`/assets/image/${order.product.image_src[0]}`}  alt="product image" />
                </div>
                <div className={styles.title}>
                    <p>{lang === "Eng" ? order.product.name: order.product.name_ua}</p>
                    <span>art {+order.product.id}</span>
                </div>
            </div>
            <div className={styles.color_block}>
                <div className={cn(styles.color_el, styles[order.color])}/>
            </div>
            <div className={styles.size_block}>{!isTablet && text.size} {order.size}</div>
            <div className={styles.quantity_block}>{!isTablet && text.quantity} {order.quantity}</div>
            <div className={styles.price_block}>
                <div className={styles.price}>{order.product.price} {text.currency}</div>
            </div>
        </div>
    );
};

export default PurchaseOrderCard;