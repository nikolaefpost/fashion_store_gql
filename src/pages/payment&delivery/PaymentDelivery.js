import React from 'react';
import {firstStep, secondStep, thirdStep} from "../../assets/icon";
import cn from "classnames";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";
import {motion, AnimatePresence} from "framer-motion";

import styles from "./paymentDelivery.module.scss";


const PaymentDelivery = () => {
    const {text} = useLanguage();
    const canPayMethods = [text.nova_poshta, text.money_transfer, text.privat24];
    const deliveryOptions = [text.sending_nova_poshta, text.international_delivery, text.delivery_time]

    return (
        <AnimatePresence>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}
            >
                <NavBlock namePage={text.payment_delivery}/>
                <h3>{text.payment_delivery}</h3>
                <div className={styles.options}>
                    <div className={styles.option_item}>
                        {text.can_pay_methods}
                        <ul>
                            {canPayMethods.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div className={styles.option_item}>
                        {text.delivery_options}
                        <ul>
                            {deliveryOptions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                </div>
                <h4>{text.checkout_process}</h4>
                <div className={styles.checkout_process}>
                    <motion.div
                        className={cn(styles.steps, styles.first_step)}
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ ease: "easeOut", delay: .3 }}
                    >
                        <img src={firstStep} alt="step"/>
                        <div>{text.select_payment}</div>
                    </motion.div>
                    <motion.div
                        className={cn(styles.steps, styles.second_step)}
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ ease: "easeOut", delay: .5 }}
                    >
                        <img src={secondStep} alt="step"/>
                        <div>{text.confirm_order}</div>
                    </motion.div>
                    <motion.div
                        className={cn(styles.steps, styles.third_step)}
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ ease: "easeOut", delay: .7 }}
                    >
                        <img src={thirdStep} alt="step"/>
                        <div>{text.redirect_website}</div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PaymentDelivery;