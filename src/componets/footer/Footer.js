import React from 'react';
import { Link } from "react-router-dom";
import {insta, telegram} from "../../assets/icon";

import styles from "./footer.module.scss"
import {useLanguage} from "../../context/setting";

const Footer = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <h3>{text.company}</h3>
                <Link to="">{text.aboutUs}</Link>
                <Link to="">{text.contacts}</Link>
            </div>
            <div className={styles.block}>
                <h3>{text.useful}</h3>
                <Link to="/payment&delivery">{text.payment_delivery}</Link>
                <Link to="/exchange">{text.exchange_and_return}</Link>
                <Link to="">{text.bonus_system}</Link>
            </div>
            <div className={styles.block}>
                <h3>{text.to_the_buyer}</h3>
                <Link to="">{text.favorites}</Link>
                <Link to="">{text.public_offer}</Link>
                <Link to="">{text.privacy_policy}</Link>
            </div>
            <div className={styles.block}>
                <h3>{text.contacts}</h3>
                <div className={styles.social}>
                    <img alt="instagram" src={insta}/>
                    <img alt="telegram" src={telegram}/>
                </div>
                <span>+38(093) 123 45 67</span>
                <span>info@defile.com</span>
            </div>
        </div>
    );
};

export default Footer;