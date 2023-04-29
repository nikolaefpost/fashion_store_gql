import React from 'react';
import cn from "classnames";

import styles from "./purchases.module.scss";
import {useLanguage} from "../../context/setting";

const PurchaseOrderCard = ({order}) => {
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
            <div className={styles.size_block}>{text.size}: {order.size}</div>
            <div className={styles.quantity_block}>{text.quantity}: {order.quantity}</div>
            <div className={styles.price_block}>
                <div className={styles.price}>{order.product.price} {text.currency}</div>
            </div>
        </div>
    );
};

export default PurchaseOrderCard;