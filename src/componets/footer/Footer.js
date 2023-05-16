import React from 'react';
import {insta, telegram} from "../../assets/icon";

import styles from "./footer.module.scss"
import {useLanguage} from "../../context/setting";
import {email, instaHref, linkedinHref, telephone1} from "../../constants";
import FooterItem from "./FooterItem";

const Footer = () => {
    const {text} = useLanguage();
    const year = new Date;
    const dataFooter = [
        {
            title: text.company,
            links: [{href: "/about_us", name: text.aboutUs}, {href: "/contacts", name: text.contacts}]
        },
        {
            title: text.useful,
            links: [{href: "/payment&delivery", name: text.payment_delivery},
                {href: "/exchange", name: text.exchange_and_return}, {href: "/bonus_system", name: text.bonus_system}]
        },
        {
            title: text.to_the_buyer,
            links: [{href: "/favorites", name: text.favorites}, {href: "/public_offer", name: text.public_offer},
                {href: "/privacy_policy", name: text.privacy_policy}]
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.rights}>©️ {year.getFullYear()} Fighter. All rights reserved</div>
            {dataFooter.map((item, i) => (
                <FooterItem key={i} item={item}/>
            ))}
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
                <span className={styles.info}>{telephone1}</span>
                <span className={styles.info}>{email}</span>
            </div>
        </div>
    );
};

export default Footer;