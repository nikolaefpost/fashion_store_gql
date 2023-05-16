import React from 'react';
import SearchForm from "./SearchForm";
import UserIdentificationMobil from "./UserIdentificationMobil";
import {useLanguage} from "../../../context/setting";
import ItemMenu from "./ItemMenu";
import {email, instaHref, linkedinHref, telephone1} from "../../../constants";
import {insta, telegram} from "../../../assets/icon";

import styles from "./navMobile.module.scss";


const MobilMenu = ({closeMenu}) => {
    const {text} = useLanguage();

    return (
        <div className={styles.mobile_menu}>
            <SearchForm/>
            <UserIdentificationMobil closeMenu={closeMenu}/>
            <ItemMenu closeMenu={closeMenu} path="new" title="new"/>
            <ItemMenu closeMenu={closeMenu} path="card" title={text.catalog}/>
            <ItemMenu closeMenu={closeMenu} path="/about_us" title={text.aboutUs}/>
            <ItemMenu closeMenu={closeMenu} path="/exchange" title={text.exchange_and_return}/>
            <ItemMenu closeMenu={closeMenu} path="/contacts" title={text.contacts}/>
            <div className={styles.contact_info}>
                <div className={styles.social}>
                    <a href={instaHref}>
                        <img alt="instagram" src={insta}/>
                    </a>
                    <a href={linkedinHref}>
                        <img alt="telegram" src={telegram}/>
                    </a>
                </div>
                <p>{telephone1}</p>
                <p>{email}</p>
            </div>
        </div>
    );
};

export default MobilMenu;