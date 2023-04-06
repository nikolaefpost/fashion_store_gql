import React from 'react';
import cn from "classnames";
import {RiDeleteBinLine} from "react-icons/ri"
import {AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import rootStore from "../../store/rootStore";
import {observer} from "mobx-react-lite";

import styles from "./order.module.scss";

const OrderCard = ({orderElement}) => {
    const { productStore, orderStore } = rootStore;

   const decQuantity = () => {
     if(orderElement.quantity>1)  orderStore.decQuantity(orderElement.id)
   }

    const incQuantity = () => {
        orderStore.incQuantity(orderElement.id)
    }

    const currentProduct = productStore.getProduct(orderElement.id);

    const handleDeleteOrderElement = () => {
        orderStore.deleteProduct(orderElement.id)
    }
    return (
        <div  className={styles.list_item}>
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
                <div className={cn(styles.color_el, styles[orderElement.color])}/>
            </div>
            <div className={styles.size_block}>Размер: {orderElement.size}</div>
            <div className={styles.quantity_block}>
                <span className={styles.sign} onClick={decQuantity}><AiOutlineMinus/></span>
                {orderElement.quantity}
                <span className={styles.sign} onClick={incQuantity}><AiOutlinePlus/></span>
            </div>
            <div className={styles.price_block}>
                <div className={styles.price}>{currentProduct.price} грн</div>
                <span className={styles.delete} onClick={handleDeleteOrderElement}><RiDeleteBinLine/></span>
            </div>
        </div>
    );
};

export default observer(OrderCard);