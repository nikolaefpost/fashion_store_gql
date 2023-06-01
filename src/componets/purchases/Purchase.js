import React, {useState} from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import PurchaseCard from "./PurchaseCard";
import {useLanguage} from "../../context/setting";
import {useMediaQuery} from "../../helpers/useMediaQuery";

import styles from "./purchases.module.scss";



const Purchase = ({purchase}) => {
    const isMobile = useMediaQuery(500);
    const {text} = useLanguage();
    const status =[text.in_processing, text.delivered, text.completed, text.canceled]

    const [openDetail, setOpenDetail] = useState(false)
    return (
        <div key={purchase.orderNumber} className={styles.history_purchase}>
            <div className={styles.purchase}>
                <div className={styles.element_block}>
                    <span>№ {+purchase.orderNumber} </span>
                    {isMobile && <span>&nbsp;</span>}
                    <span>{text.from} {purchase.date}</span>
                </div>
                <div className={styles.element_block}>
                    <span>{text.status}: </span>
                    {isMobile && <span>&nbsp;</span>}
                    <span>{status[purchase.status]}</span>
                </div>
                {!isMobile && <div className={styles.element_block}>
                    <span>{text.order_price}: </span>
                    <span>{purchase.total} {text.currency}</span>
                </div>}
                    <div className={styles.element_block}>
                    <span>{text.bonus_amount}:</span>
                        {isMobile && <span>&nbsp;</span>}
                    <span>{purchase.bonus? purchase.bonus: 0} {text.currency}</span>
                    </div>
                <div className={styles.element_block}>
                    <span>{text.total_amount}: </span>
                    {isMobile && <span>&nbsp;</span>}
                    <span>{+purchase.total - +purchase.bonus} {text.currency}</span>
                </div>
                <span
                    className={cn(styles.down_svg, {[styles.active_down_svg]: openDetail})}
                    onClick={() => setOpenDetail(prev => !prev)}
                ><AiOutlineRight/></span>
            </div>
            {openDetail && <PurchaseCard purchase={purchase} isMobile={isMobile}/>}
        </div>
    );
};

export default Purchase;