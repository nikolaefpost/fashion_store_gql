import React, {useState} from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import PurchaseCard from "./PurchaseCard";

import styles from "./purchases.module.scss";
import {useLanguage} from "../../context/setting";

const Purchase = ({purchase}) => {
    const {text} = useLanguage();

    const [openDetail, setOpenDetail] = useState(false)
    return (
        <div key={purchase.orderNumber} className={styles.history_purchase}>
            <div className={styles.purchase}>
                <div className={styles.element_block}>
                    <span>№ {+purchase.orderNumber} {text.from} {purchase.date}</span>
                    <span/>
                </div>
                <div className={styles.element_block}>
                    <span>{text.status}:</span>
                    <span>{purchase.status}</span>
                </div>
                <div className={styles.element_block}>
                    <span>{text.order_price}:</span>
                    <span>{purchase.total} {text.currency}</span>
                </div>
                <div className={styles.element_block}>
                    <span>{text.bonus_amount}:</span>
                    <span>{purchase.bonus? purchase.bonus: 0} {text.currency}</span>
                </div>
                <div className={styles.element_block}>
                    <span>{text.total_amount}:</span>
                    <span>{+purchase.total - +purchase.bonus} {text.currency}</span>
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