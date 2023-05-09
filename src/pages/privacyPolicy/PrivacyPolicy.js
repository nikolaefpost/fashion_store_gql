import React from 'react';
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./privacyPolicy.module.scss";

const PrivacyPolicy = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.content}>
            <NavBlock namePage={text.privacy_policy}/>
            <h3>{text.privacy_policy}</h3>
        </div>
    );
};

export default PrivacyPolicy;