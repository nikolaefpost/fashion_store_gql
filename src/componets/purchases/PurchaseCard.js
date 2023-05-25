import React from 'react';
import PurchaseOrderCard from "./PurchaseOrderCard";
import {useLanguage} from "../../context/setting";

import styles from "./purchases.module.scss";


const PurchaseCard = ({purchase, isMobile}) => {
    const {text} = useLanguage();
    const {name, surname, email, telephone, delivery, payment} = purchase.deliveryInfo
    return (
        <div className={styles.purchase_card}>
            {purchase.orders.map(item=>(
                <PurchaseOrderCard key={item.product.id} order={item} isMobile={isMobile} />
            ))}
            <div className={styles.info_block}>
                <div>
                    <span>{text.name_last_name}: </span>
                    <span>{name} {surname}</span>
                </div>
                <div>
                    <span>E-mail: </span>
                    <span>{email}</span>
                </div>
                <div>
                    <span>{text.phone_number}: </span>
                    <span>{telephone}</span>
                </div>
            </div>
            <div className={styles.info_block}>
                <div>
                    <span>{text.delivery_method}: </span>
                    <span>{delivery}</span>
                </div>
                <div>
                    <span>{text.payment_method}: </span>
                    <span>{payment}</span>
                </div>
            </div>
        </div>
    );
};

export default PurchaseCard;