import React, {useRef} from 'react';
import {SlArrowDown} from "react-icons/sl";
import {Link, NavLink, useHref} from "react-router-dom";
import {FavoriteIcon, OrderIcon} from "../../../assets/icon";
import {useLanguage} from "../../../context/setting";
import MobilMenu from "./MobilMenu";
import cn from "classnames";
import {useCycle, motion} from "framer-motion";
import {useDimensions} from "../../../helpers/use-dimensions";
import {MenuToggle} from "./MenuToggle";

import styles from "./navMobile.module.scss";

const NavMobile = () => {

    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    const {lang, onChangeLang} = useLanguage();
    let isHome = useHref() === "#/";

    // const [isOpenedMenu, setIsOpenedMenu] = useState(false);
    // const openMenu = () => setIsOpenedMenu(pre => !pre)
    // const closeMenu = () => setIsOpenedMenu(false)

    const mainStyle = {
        color: "#FFFFFF"
    }
    return (
        <motion.div
            className={styles.nav} style={isHome ? mainStyle : {}}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <div className={styles.left_block}>
                {/*<div onClick={openMenu} className={styles.menu_icon}>*/}
                {/*    {!isOpenedMenu ?*/}
                {/*        <MenuIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/> :*/}
                {/*        <CloseMenuIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/>*/}
                {/*    }*/}
                {/*</div>*/}
                <MenuToggle toggle={() => toggleOpen()} color={isHome ? "#FFFFFF" : "#E0BEA2"} />
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
                className={cn(styles.title, styles.fashion)}
                style={isHome ? mainStyle : {}}
            >
                fashion
            </NavLink>
            <div className={styles.right_block}>
                <Link to="favorites"><FavoriteIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/></Link>
                <Link to="order"><OrderIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/></Link>
            </div>
            <MobilMenu toggleOpen={toggleOpen} open={isOpen}/>
        </motion.div>
    );
};

export default NavMobile;