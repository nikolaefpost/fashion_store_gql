import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import rootStore from "../../store/rootStore";
import {AiOutlineRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import OrderList from "./OrderList";
import Checkout from "./checkout/Checkout";

import styles from "./order.module.scss";
import {getOrderStorage, getTotal} from "../../appolo/operations/order/orderMutations";
import {orderItemsVar} from "../../appolo/cashe/productVar";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productQuery";


const Order = () => {
    const {data} = useQuery(GET_PRODUCT_LOCAL);

    getOrderStorage()

    const navigate = useNavigate();
    const { orderStore, userStore } = rootStore;
    const  sum  = getTotal();
    const orderItems = useReactiveVar(orderItemsVar);

    return (
        <div className={styles.order}>
            <div className={styles.nav_block}>
                <span onClick={()=>navigate("/")}>Главная</span>
                <AiOutlineRight/>
                <span>Корзина</span>
            </div>
            <OrderList order={orderItems} total={sum} products={data} />
            <Checkout
                formPersonalInfo={userStore.formPersonalInfo}
                formDeliveryRadio={userStore.formDeliveryRadio}
                formDeliveryAddress={userStore.formDeliveryAddress}
                formPaymentRadio={userStore.formPaymentRadio}
                sum={sum}
                setPurchase={orderStore.setPurchase}
                user={userStore.user}
            />
        </div>
    );
};

export default observer(Order);