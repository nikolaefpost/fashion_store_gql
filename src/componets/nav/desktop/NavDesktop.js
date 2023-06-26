import React from 'react';
import {useLanguage} from "../../../context/setting";
import {Link, NavLink, useHref} from "react-router-dom";
import {FavoriteIcon, MenuIcon, OrderIcon, SearchIcon} from "../../../assets/icon";
import {SlArrowDown} from "react-icons/sl";
import UserIdentification from "./UserIdentification";
import {useMediaQuery} from "../../../helpers/useMediaQuery";
import cn from "classnames";
import {useQuery } from "@apollo/client";
import {GET_ORDERS_LOCAL} from "../../../appolo/operations/order/orderGrapfQgl";

import styles from "./navDesktop.module.scss";
import {getOrderStorage} from "../../../appolo/operations/order/orderStore";

const NavDesktop = () => {
    getOrderStorage();
    const {data} = useQuery(GET_ORDERS_LOCAL);
    const {text, lang, onChangeLang} = useLanguage();
    let isHome = useHref() === "#/";
    const isTablet = useMediaQuery(1000);

    const mainStyle = {
        color: "#FFFFFF"
    }

    return (
        <nav className={styles.nav} style={isHome ? mainStyle : {}}>

            <div className={styles.left_block}>
                {!isTablet && <MenuIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/>}
                <NavLink
                    to="new"
                    style={isHome ? mainStyle : {}}
                    className={({isActive}) =>
                        isActive ? styles.active : ""
                    }
                >
                    {text.new}
                </NavLink>
                <NavLink
                    to="card"
                    style={isHome ? mainStyle : {}}
                    className={({isActive}) =>
                        isActive ? styles.active : ""
                    }
                >
                    {text.catalog}
                </NavLink>
                <NavLink
                    to="/about_us"
                    style={isHome ? mainStyle : {}}
                    className={({isActive}) =>
                        isActive ? styles.active : ""
                    }
                >
                    {text.aboutUs}
                </NavLink>
            </div>
            <NavLink
                to="/"
                className={cn(styles.title, styles.fashion)}
                style={isHome ? mainStyle : {}}
            >
                fashion
            </NavLink>

            <div className={styles.right_block}>
                <div className={styles.language}>
                    <button
                        onClick={onChangeLang}
                        style={isHome ? mainStyle : {}}
                    >{lang==="Eng"? "Укр": "Eng"}</button>
                    <SlArrowDown/>
                </div>
                <SearchIcon color={isHome ? "#FFFFFF" : "#252525"} size={23}/>
                {/*<UserIcon color={isHome? "#FFFFFF":"#E0BEA2"} />*/}
                <UserIdentification isHome={isHome}/>
                <Link to="favorites"><FavoriteIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/></Link>
                <Link to="order" className={styles.order}>
                    <OrderIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/>
                    {data.orders.length>0 && <div className={styles.count}>{data.orders.length}</div>}
                </Link>

            </div>

            {/*{!!userStore.user && !!userStore.user.firstName && <div>*/}
            {/*    <span>Hi {userStore.user?.firstName}!</span>*/}
            {/*    <button onClick={userStore.deleteUser}>exit</button>*/}
            {/*</div>}*/}
        </nav>
    );
};

export default NavDesktop;