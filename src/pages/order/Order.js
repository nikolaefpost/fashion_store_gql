import React from 'react';
import {AiOutlineRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import OrderList from "./OrderList";
import Checkout from "./checkout/Checkout";
import { getOrderStorage, getTotal} from "../../appolo/operations/order/orderStore";
import {currentUserVar, orderItemsVar} from "../../appolo/cashe/appVar";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {
    formDeliveryAddress,
    formDeliveryRadio,
    formPaymentRadio,
    formPersonalInfo
} from "../../appolo/operations/user/userFormData";

import styles from "./order.module.scss";
import {useLanguage} from "../../context/setting";


const Order = () => {
    const {text} = useLanguage();
    const {data} = useQuery(GET_PRODUCT_LOCAL);

    getOrderStorage()
    const navigate = useNavigate();
    const  sum  = getTotal();
    const orderItems = useReactiveVar(orderItemsVar);
    const user = useReactiveVar(currentUserVar)

    return (
        <div className={styles.order}>
            <div className={styles.nav_block}>
                <span onClick={()=>navigate("/")}>{text.home}</span>
                <AiOutlineRight/>
                <span>{text.cart}</span>
            </div>
            <OrderList order={orderItems} total={sum} products={data} />
            <Checkout
                formPersonalInfo={formPersonalInfo}
                formDeliveryRadio={formDeliveryRadio}
                formDeliveryAddress={formDeliveryAddress}
                formPaymentRadio={formPaymentRadio}
                sum={sum}
                // setPurchase={orderStore.setPurchase}
                user={user}
            />
        </div>
    );
};

export default Order;