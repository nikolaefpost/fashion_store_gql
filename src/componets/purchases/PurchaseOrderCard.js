import React from 'react';
import cn from "classnames";
import rootStore from "../../store/rootStore";

import styles from "./purchases.module.scss";

const PurchaseOrderCard = ({order}) => {

    const { productStore } = rootStore;
    const currentProduct = productStore.getProduct(order.id);
    return (
        <div key={currentProduct.id} className={styles.product_position}>
            <div className={styles.title_block}>
                <div className={styles.image}>
                    <img src={currentProduct.image} alt="product image" />
                </div>
                <div className={styles.title}>
                    {currentProduct.title}
                    <span>art {currentProduct.id}</span>
                </div>
            </div>
            <div className={styles.color_block}>
                <div className={cn(styles.color_el, styles[order.color])}/>
            </div>
            <div className={styles.size_block}>Размер: {order.size}</div>
            <div className={styles.quantity_block}>Количество: {order.quantity}</div>
            <div className={styles.price_block}>
                <div className={styles.price}>{currentProduct.price} грн</div>
            </div>
        </div>
    );
};

export default PurchaseOrderCard;