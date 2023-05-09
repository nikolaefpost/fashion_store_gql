import React from 'react';

import styles from "./aboutUs.module.scss"
import NavBlock from "../../componets/navBlock/NavBlock";
import {useLanguage} from "../../context/setting";

const AboutUs = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.content}>
            <NavBlock namePage={text.aboutUs}/>
            <h3>{text.aboutUs}</h3>
        </div>
    );
};

export default AboutUs;