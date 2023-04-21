import React, {useState} from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import PurchaseCard from "./PurchaseCard";

import styles from "./purchases.module.scss";

const Purchase = ({purchase}) => {

    const [openDetail, setOpenDetail] = useState(false)
    return (
        <div key={purchase.orderNumber} className={styles.history_purchase}>
            <div className={styles.purchase}>
                <div className={styles.element_block}>
                    <span>№ {+purchase.orderNumber} от {purchase.date}</span>
                    <span/>
                </div>
                <div className={styles.element_block}>
                    <span>Статус:</span>
                    <span>{purchase.status}</span>
                </div>
                <div className={styles.element_block}>
                    <span>Сумма заказа:</span>
                    <span>{purchase.total} грн</span>
                </div>
                <div className={styles.element_block}>
                    <span>Сумма бонуса:</span>
                    <span>{purchase.bonus? purchase.bonus: 0} грн</span>
                </div>
                <div className={styles.element_block}>
                    <span>Итоговая сумма:</span>
                    <span>{+purchase.total - +purchase.bonus} грн</span>
                </div>
                <span
                    className={cn(styles.down_svg, {[styles.active_down_svg]: openDetail})}
                    onClick={() => setOpenDetail(prev => !prev)}
                ><AiOutlineRight/></span>
            </div>
            {openDetail && <PurchaseCard purchase={purchase}/>}
        </div>
    );
};

export default Purchase;