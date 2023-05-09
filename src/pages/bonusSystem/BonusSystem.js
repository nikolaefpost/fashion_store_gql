import React from 'react';
import {useLanguage} from "../../context/setting";
import styles from "./bonusSystem.module.scss";
import NavBlock from "../../componets/navBlock/NavBlock";

const BonusSystem = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.content}>
            <NavBlock namePage={text.bonus_system}/>
            <h3>{text.bonus_system}</h3>
        </div>
    );
};

export default BonusSystem;