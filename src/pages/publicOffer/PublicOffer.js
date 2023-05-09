import React from 'react';
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./publicOffer.module.scss";

const PublicOffer = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.content}>
            <NavBlock namePage={text.public_offer}/>
            <h3>{text.public_offer}</h3>
        </div>
    );
};

export default PublicOffer;