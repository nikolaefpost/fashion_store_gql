import React from 'react';

import styles from "./contacts.module.scss"
import NavBlock from "../../componets/navBlock/NavBlock";
import {useLanguage} from "../../context/setting";
import SubscriptBlock from "../../componets/SubscriptBlock/subscriptBlock";
import {email, instaHref, linkedinHref, telephone1, telephone2} from "../../constants";
import {insta, telegram} from "../../assets/icon";

const Contacts = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.content}>
            <NavBlock namePage={text.contacts}/>
            <h3>{text.connect_us}</h3>
            <div className={styles.connect}>
                <div className={styles.item}>
                    <h4>{text.social_networks}</h4>
                   <a href={instaHref}>
                       <img alt="instagram" src={insta}/>
                   </a>
                    <a href={linkedinHref}>
                        <img alt="telegram" src={telegram}/>
                    </a>
                </div>
                <div className={styles.item}>
                    <h4>{text.by_phone}</h4>
                    <p>{telephone1}</p>
                    <p>{telephone2}</p>
                </div>
                <div className={styles.item}>
                    <h4>{text.by_mail}</h4>
                    <p>{email}</p>
                </div>
                <div className={styles.item}>
                    <h4>{text.our_office}</h4>
                    <p>{text.address}</p>
                </div>
            </div>
            <SubscriptBlock/>
        </div>
    );
};

export default Contacts;