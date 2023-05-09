import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useLanguage} from "../../context/setting";
import {observer} from "mobx-react-lite";
import {SlArrowDown} from "react-icons/sl";
import { useHref } from "react-router-dom"
import {MenuIcon, FavoriteIcon, SearchIcon, OrderIcon} from "../../assets/icon";
import UserIdentification from "./UserIdentification";

import styles from "./nav.module.scss";

const Nav = () => {
    const {text, lang, onChangeLang } = useLanguage();
    let isHome = useHref() === "#/";

    const mainStyle = {
        color: "#FFFFFF"
    }



    return (
        <nav className={styles.nav} style={isHome? mainStyle: {}}>

            <div className={styles.left_block}>
                <MenuIcon color={isHome? "#FFFFFF":"#E0BEA2"}/>
                <NavLink
                    to="new"
                    style={isHome? mainStyle: {}}
                    className={({ isActive}) =>
                         isActive ? styles.active : ""
                    }
                >
                    {text.new}
                </NavLink>
                <NavLink
                    to="card"
                    style={isHome? mainStyle: {}}
                    className={({ isActive}) =>
                        isActive ? styles.active : ""
                    }
                >
                    {text.catalog}
                </NavLink>
                <NavLink
                    to="about-us"
                    style={isHome? mainStyle: {}}
                    className={({ isActive}) =>
                        isActive ? styles.active : ""
                    }
                >
                    {text.aboutUs}
                </NavLink>
            </div>
            <NavLink
                to="/"
                className={styles.title}
                style={isHome? mainStyle: {}}
            >fashion</NavLink>

            <div className={styles.right_block}>
                <div className={styles.language}>
                    <button
                        onClick={onChangeLang}
                        style={isHome? mainStyle: {}}
                    >{lang}</button>
                    <SlArrowDown/>
                </div>
                <SearchIcon color={isHome? "#FFFFFF":"#252525"} />
                {/*<UserIcon color={isHome? "#FFFFFF":"#E0BEA2"} />*/}
                <UserIdentification isHome={isHome}/>
                <Link to="favorites"><FavoriteIcon color={isHome? "#FFFFFF":"#E0BEA2"}/></Link>
                <Link to="order"><OrderIcon color={isHome? "#FFFFFF":"#E0BEA2"} /></Link>

            </div>

            {/*{!!userStore.user && !!userStore.user.firstName && <div>*/}
            {/*    <span>Hi {userStore.user?.firstName}!</span>*/}
            {/*    <button onClick={userStore.deleteUser}>exit</button>*/}
            {/*</div>}*/}
        </nav>
    );
};

export default observer(Nav);