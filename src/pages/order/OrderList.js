import React from 'react';
import OrderCard from "./OrderCard";

import styles from "./order.module.scss"

const OrderList = ({order, products, total}) => {
    return (
        <div className={styles.order_list}>
            <h3>Ваш заказ</h3>
            <div className={styles.list}>
                {order.map((el) => (
                    <OrderCard
                        key={el.product.id}
                        orderElement={el}
                        currentProduct={products ? products.productList.find(item => item.id === el.product.id) : {}}
                    />
                ))}
            </div>
            <div className={styles.total}>К оплате: <span>{total}</span></div>

        </div>
    );
};

export default OrderList;