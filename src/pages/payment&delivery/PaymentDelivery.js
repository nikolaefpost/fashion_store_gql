import React from 'react';
import {firstStep, secondStep, thirdStep} from "../../assets/icon";
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import {useLanguage} from "../../context/setting";
import {useNavigate} from "react-router-dom";

import styles from "./paymentDelivery.module.scss"



const PaymentDelivery = () => {
    const {text} = useLanguage();
    const canPayMethods = [text.nova_poshta, text.money_transfer, text.privat24];
    const deliveryOptions = [text.sending_nova_poshta, text.international_delivery, text.delivery_time]


    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/")
    }
    return (
        <div className={styles.content}>
            <div className={styles.nav_block}>
                <span onClick={handleHome}>{text.home}</span>
                <AiOutlineRight/>
                <span>{text.payment_delivery}</span>
            </div>
            <h3>{text.payment_delivery}</h3>
            <div className={styles.options}>
                <div className={styles.option_item}>
                    {text.can_pay_methods}
                    <ul>
                        {canPayMethods.map((item, i)=><li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div className={styles.option_item}>
                    {text.delivery_options}
                    <ul>
                        {deliveryOptions.map((item, i)=><li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>
            <h4>{text.checkout_process}</h4>
            <div className={styles.checkout_process}>
                <div className={cn(styles.steps, styles.first_step)}>
                    <img src={firstStep} alt="step"/>
                    <div>{text.select_payment}</div>
                </div>
                <div className={cn(styles.steps, styles.second_step)}>
                    <img src={secondStep} alt="step"/>
                    <div>{text.confirm_order}</div>
                </div>
                <div className={cn(styles.steps, styles.third_step)}>
                    <img src={thirdStep} alt="step"/>
                    <div>{text.redirect_website}</div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDelivery;