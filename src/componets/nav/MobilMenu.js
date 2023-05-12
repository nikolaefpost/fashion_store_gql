import React from 'react';
import SearchForm from "./mobil/SearchForm";
import UserIdentificationMobil from "./mobil/UserIdentificationMobil";
import {useLanguage} from "../../context/setting";

import styles from "./navMobile.module.scss"
import {Link} from "react-router-dom";


const MobilMenu = () => {
    const { text } = useLanguage();

    return (
        <div className={styles.mobile_menu}>
            <SearchForm/>
            <UserIdentificationMobil/>
            <Link to="new" className={styles.item_menu}>new</Link>
            <Link to="card" className={styles.item_menu}>{text.catalog}</Link>
            <Link to="/about_us" className={styles.item_menu}>{text.aboutUs}</Link>
            <Link to="/exchange" className={styles.item_menu}>{text.exchange_and_return}</Link>
            <Link to="/contacts" className={styles.item_menu}>{text.contacts}</Link>
        </div>
    );
};

export default MobilMenu;