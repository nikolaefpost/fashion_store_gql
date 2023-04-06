import React from 'react';
import {observer} from "mobx-react-lite";
import rootStore from "../../store/rootStore";
import {AiOutlineRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import OrderList from "./OrderList";
import Checkout from "./checkout/Checkout";

import styles from "./order.module.scss";


const Order = () => {
    const navigate = useNavigate();
    const { orderStore, userStore } = rootStore;
    const  sum  = orderStore.getTotal();

    return (
        <div className={styles.order}>
            <div className={styles.nav_block}>
                <span onClick={()=>navigate("/")}>Главная</span>
                <AiOutlineRight/>
                <span>Корзина</span>
            </div>
            <OrderList order={orderStore.order} total={sum} />
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