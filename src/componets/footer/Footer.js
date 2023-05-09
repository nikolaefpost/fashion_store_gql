import React from 'react';
import { Link } from "react-router-dom";
import {insta, telegram} from "../../assets/icon";

import styles from "./footer.module.scss"
import {useLanguage} from "../../context/setting";
import {email, instaHref, linkedinHref, telephone1} from "../../constants";

const Footer = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <h3>{text.company}</h3>
                <Link to="/about_us">{text.aboutUs}</Link>
                <Link to="/contacts">{text.contacts}</Link>
            </div>
            <div className={styles.block}>
                <h3>{text.useful}</h3>
                <Link to="/payment&delivery">{text.payment_delivery}</Link>
                <Link to="/exchange">{text.exchange_and_return}</Link>
                <Link to="/bonus_system">{text.bonus_system}</Link>
            </div>
            <div className={styles.block}>
                <h3>{text.to_the_buyer}</h3>
                <Link to="/favorites">{text.favorites}</Link>
                <Link to="/public_offer">{text.public_offer}</Link>
                <Link to="/privacy_policy">{text.privacy_policy}</Link>
            </div>
            <div className={styles.block}>
                <h3>{text.contacts}</h3>
                <div className={styles.social}>
                    <a href={instaHref}>
                        <img alt="instagram" src={insta}/>
                    </a>
                    <a href={linkedinHref}>
                        <img alt="telegram" src={telegram}/>
                    </a>
                </div>
                <span>{telephone1}</span>
                <span>{email}</span>
            </div>
        </div>
    );
};

export default Footer;