import React, {useRef} from 'react';
import {SlArrowDown} from "react-icons/sl";
import {Link, NavLink, useHref} from "react-router-dom";
import {FavoriteIcon, OrderIcon} from "../../../assets/icon";
import {useLanguage} from "../../../context/setting";
import MobilMenu from "./MobilMenu";
import cn from "classnames";
import {useCycle, motion} from "framer-motion";
import {useDimensions} from "../../../hooks/use-dimensions";
import {MenuToggle} from "./MenuToggle";

import styles from "./navMobile.module.scss";
import {getOrderStorage} from "../../../appolo/operations/order/orderStore";
import {useQuery} from "@apollo/client";
import {GET_ORDERS_LOCAL} from "../../../appolo/operations/order/orderGrapfQgl";

const NavMobile = () => {
    getOrderStorage();
    const {data} = useQuery(GET_ORDERS_LOCAL);
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
                    >{lang==="Eng"? "Укр": "Eng"}</button>
                    <SlArrowDown/>
                </div>
            </div>
            <NavLink
                to="/"
                className={cn(styles.title, styles.fashion)}
                style={isHome ? mainStyle : {}}
                onClick={()=>toggleOpen(0)}
            >
                fashion
            </NavLink>
            <div className={styles.right_block}>
                <Link to="favorites" onClick={()=>toggleOpen(0)}><FavoriteIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/></Link>
                <Link to="order" className={styles.order} onClick={()=>toggleOpen(0)}>
                    <OrderIcon color={isHome ? "#FFFFFF" : "#E0BEA2"}/>
                    {data.orders.length>0 && <div className={styles.count}>{data.orders.length}</div>}
                </Link>
            </div>
            <MobilMenu toggleOpen={toggleOpen} open={isOpen}/>
        </motion.div>
    );
};

export default NavMobile;