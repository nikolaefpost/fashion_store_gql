import React from 'react';
import NavBlock from "../../componets/navBlock/NavBlock";
import {useLanguage} from "../../context/setting";
import SubscriptBlock from "../../componets/SubscriptBlock/subscriptBlock";
import {email, instaHref, linkedinHref, telephone1, telephone2} from "../../constants";
import {insta, telegram} from "../../assets/icon";
import {motion, AnimatePresence} from "framer-motion";

import styles from "./contacts.module.scss";

const Contacts = () => {
    const {text} = useLanguage();
    return (
        <AnimatePresence>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}
            >
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
            </motion.div>
        </AnimatePresence>
    );
};

export default Contacts;