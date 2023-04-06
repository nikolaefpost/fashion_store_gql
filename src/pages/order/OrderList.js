import React from 'react';
import OrderCard from "./OrderCard";
import {observer} from "mobx-react-lite";

import styles from "./order.module.scss"

const OrderList = ({order, total}) => {
    return (
        <div className={styles.order_list}>
            <h3>Ваш заказ</h3>
            <div className={styles.list}>
                {order.map((el)=>(
                    <OrderCard key={el.id} orderElement={el} />
                ))}
            </div>
            <div className={styles.total}>К оплате: <span>{total}</span></div>

        </div>
    );
};

export default observer(OrderList);