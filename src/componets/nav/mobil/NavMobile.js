import React, {useState} from 'react';
import {SlArrowDown} from "react-icons/sl";
import {Link, NavLink, useHref} from "react-router-dom";
import {FavoriteIcon, MenuIcon, OrderIcon} from "../../../assets/icon";
import {useLanguage} from "../../../context/setting";
import MobilMenu from "./MobilMenu";
import CloseMenuIcon from "../../../assets/icon/CloseMenuIcon";

import styles from "./navMobile.module.scss";


const NavMobile = () => {
    const {lang, onChangeLang} = useLanguage();
    let isHome = useHref() === "#/";

    const [isOpenedMenu, setIsOpenedMenu] = useState(false);
    const openMenu = () => setIsOpenedMenu(pre => !pre)
    const closeMenu = () => setIsOpenedMenu(false)

    const mainStyle = {
        color: "#FFFFFF"
    }
    return (
        <div className={styles.nav} style={isHome ? mainStyle : {}}>
            <div className={styles.left_block}>
                <div onClick={openMenu} className={styles.menu_icon}>
                    {!isOpenedMenu ?
                        <MenuIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/> :
                        <CloseMenuIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/>
                    }
                </div>
                <div className={styles.language}>
                    <button
                        onClick={onChangeLang}
                        style={isHome ? mainStyle : {}}
                    >{lang}</button>
                    <SlArrowDown/>
                </div>
            </div>
            <NavLink
                to="/"
                className={styles.title}
                style={isHome ? mainStyle : {}}
            >
                fashion
            </NavLink>
            <div className={styles.right_block}>
                <Link to="favorites"><FavoriteIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/></Link>
                <Link to="order"><OrderIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/></Link>
            </div>
            <MobilMenu closeMenu={closeMenu} open={isOpenedMenu}/>
        </div>
    );
};

export default NavMobile;