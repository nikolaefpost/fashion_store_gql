import React from 'react';
import PurchaseOrderCard from "./PurchaseOrderCard";

import styles from "./purchases.module.scss";

const PurchaseCard = ({purchase}) => {
    const {name, surname, email, telephone, delivery, payment} = purchase.deliveryInfo
    return (
        <div className={styles.purchase_card}>
            {purchase.order.map(item=>(
                <PurchaseOrderCard key={item.id} order={item} />
            ))}
            <div className={styles.info_block}>
                <span>Имя Фамилия: {name} {surname}</span>
                <span>E-mail: {email}</span>
                <span>Номер телефона: {telephone}</span>
            </div>
            <div className={styles.info_block}>
                <span>Способ доставки: {delivery}</span>
                <span>Способ оплаты: {payment}</span>
            </div>
        </div>
    );
};

export default PurchaseCard;