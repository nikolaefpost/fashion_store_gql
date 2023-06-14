import React from 'react';
import OrderList from "./OrderList";
import Checkout from "./checkout/Checkout";
import { getTotal} from "../../appolo/operations/order/orderStore";
import {currentUserVar} from "../../appolo/cashe/appVar";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {formDeliveryAddress, formDeliveryRadio, formPaymentRadio, formPersonalInfo}
    from "../../appolo/operations/user/userFormData";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./order.module.scss";
import {GET_ORDERS_LOCAL} from "../../appolo/operations/order/orderGrapfQgl";


const Order = () => {
    const {text} = useLanguage();
    const {data} = useQuery(GET_PRODUCT_LOCAL);
    const {data: orders} = useQuery(GET_ORDERS_LOCAL);
    const sum = getTotal();
    const user = useReactiveVar(currentUserVar)

    return (
        <div className={styles.order}>
            <NavBlock namePage={text.cart}/>
            {orders?.orders.length>0 ?<>
                <OrderList order={orders.orders} total={sum} products={data}/>
                <Checkout
                    formPersonalInfo={formPersonalInfo}
                    formDeliveryRadio={formDeliveryRadio}
                    formDeliveryAddress={formDeliveryAddress}
                    formPaymentRadio={formPaymentRadio}
                    sum={sum}
                    user={user}
                />
            </>:
                <div className={styles.no_items}>{text.no_items}</div>
            }

        </div>
    );
};

export default Order;