import React from 'react';
import PurchaseOrderCard from "./PurchaseOrderCard";

import styles from "./purchases.module.scss";
import {useLanguage} from "../../context/setting";

const PurchaseCard = ({purchase}) => {
    const {text} = useLanguage();
    const {name, surname, email, telephone, delivery, payment} = purchase.deliveryInfo
    return (
        <div className={styles.purchase_card}>
            {purchase.orders.map(item=>(
                <PurchaseOrderCard key={item.product.id} order={item} />
            ))}
            <div className={styles.info_block}>
                <span>{text.name_last_name}: {name} {surname}</span>
                <span>E-mail: {email}</span>
                <span>{text.phone_number}: {telephone}</span>
            </div>
            <div className={styles.info_block}>
                <span>{text.delivery_method}: {delivery}</span>
                <span>{text.payment_method}: {payment}</span>
            </div>
        </div>
    );
};

export default PurchaseCard;