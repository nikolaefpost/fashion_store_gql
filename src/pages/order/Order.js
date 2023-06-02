import React from 'react';
import OrderList from "./OrderList";
import Checkout from "./checkout/Checkout";
import {getOrderStorage, getTotal} from "../../appolo/operations/order/orderStore";
import {currentUserVar, orderItemsVar} from "../../appolo/cashe/appVar";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {formDeliveryAddress, formDeliveryRadio, formPaymentRadio, formPersonalInfo}
    from "../../appolo/operations/user/userFormData";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./order.module.scss";


const Order = () => {
    const {text} = useLanguage();
    const {data} = useQuery(GET_PRODUCT_LOCAL);

    getOrderStorage()
    const sum = getTotal();
    const orderItems = useReactiveVar(orderItemsVar);
    const user = useReactiveVar(currentUserVar)

    return (
        <div className={styles.order}>
            <NavBlock namePage={text.cart}/>
            {orderItems.length>0 ?<>
                <OrderList order={orderItems} total={sum} products={data}/>
                <Checkout
                    formPersonalInfo={formPersonalInfo}
                    formDeliveryRadio={formDeliveryRadio}
                    formDeliveryAddress={formDeliveryAddress}
                    formPaymentRadio={formPaymentRadio}
                    sum={sum}
                    user={user}
                />
            </>:
                <div className={styles.no_items}>There are no items in the cart</div>
            }

        </div>
    );
};

export default Order;