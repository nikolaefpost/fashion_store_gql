import React from 'react';
import {cart, delivery, label, time, form, expenses} from "../../assets/icon"
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./exchangeReturn.module.scss";

const ExchangeReturn = () => {
    const {text} = useLanguage();

    const caseItem = [
        {icon: label, text: text.has_labels},
        {icon: time, text: text.two_days},
        {icon: delivery, text: text.shipped_Ukraine},
        {icon: form, text: text.return_form},
        {icon: expenses, text: text.all_costs_exchange},
        {icon: cart, text: text.transfer_funds},
    ]

    return (
        <div className={styles.content}>
            <NavBlock namePage={text.exchange_and_return}/>
            <h3>{text.exchange_and_return}</h3>
            <p>{text.does_not_suit}</p>
            <p>{text.exchange_case}</p>
            <div className={styles.case}>
                {caseItem.map(item=>(
                    <div key={item.icon} className={styles.case_item}>
                        <img src={item.icon} alt="cases"/>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ExchangeReturn;