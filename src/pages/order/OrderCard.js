import React, {useEffect} from 'react';
import cn from "classnames";
import {RiDeleteBinLine} from "react-icons/ri"
import {AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import rootStore from "../../store/rootStore";
import {observer} from "mobx-react-lite";

import styles from "./order.module.scss";
import {decQuantityItem, deleteProduct, incQuantityItem} from "../../appolo/operations/order/orderMutations";

const OrderCard = ({orderElement, currentProduct}) => {
    const { productStore, orderStore } = rootStore;

   const decQuantity = () => {
     if(orderElement.quantity>1)  decQuantityItem(orderElement.id)
   }

    const incQuantity = () => {
        incQuantityItem(orderElement.id)
    }

    const handleDeleteOrderElement = () => {
        deleteProduct(orderElement.id)
    }
    return (currentProduct.id?
        <div  className={styles.list_item}>
            <div className={styles.title_block}>
                <div className={styles.image}>
                    <img  src={`/assets/image/${currentProduct?.image_src[0]}`} alt="product image" />
                </div>
                <div className={styles.title}>
                    {currentProduct.title}
                    <span>art {parseInt(currentProduct.id)}</span>
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
        </div>:
            <div>Loading...</div>
    );
};

export default observer(OrderCard);