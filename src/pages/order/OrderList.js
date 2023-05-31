import React from 'react';
import OrderCard from "./OrderCard";
import {useLanguage} from "../../context/setting";

import styles from "./order.module.scss"


const OrderList = ({order, products, total}) => {
    const {text} = useLanguage();
    return (
        <div className={styles.order_list}>
            <h3>{text.your_order}</h3>
            <div className={styles.list}>
                {order.map((el) => (
                    <OrderCard
                        key={el.product.id}
                        orderElement={el}
                        currentProduct={products ? products.productList.find(item => item.id === el.product.id) : {}}
                    />
                ))}
            </div>
            <div className={styles.total}>{text.to_pay}: <span>{total}</span></div>

        </div>
    );
};

export default OrderList;