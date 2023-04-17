import React from 'react';
import OrderCard from "./OrderCard";
import {observer} from "mobx-react-lite";

import styles from "./order.module.scss"
import {getProduct} from "../../appolo/operations/poducts/productMutations";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productQuery";
import {productItemsVar} from "../../appolo/cashe/productVar";
import {getTotal} from "../../appolo/operations/order/orderMutations";

const OrderList = ({order, products, total}) => {

    return (
        <div className={styles.order_list}>
            <h3>Ваш заказ</h3>
            <div className={styles.list}>
                {order.map((el) => (
                    <OrderCard
                        key={el.id}
                        orderElement={el}
                        currentProduct={products ? products.productList.find(item => item.id === el.id) : {}}
                    />
                ))}
            </div>
            <div className={styles.total}>К оплате: <span>{total}</span></div>

        </div>
    );
};

export default observer(OrderList);