import React from 'react';
import SearchForm from "./SearchForm";
import UserIdentificationMobil from "./UserIdentificationMobil";
import {useLanguage} from "../../../context/setting";
import ItemMenu from "./ItemMenu";
import {email, instaHref, linkedinHref, telephone1} from "../../../constants";
import {insta, telegram} from "../../../assets/icon";
import { motion } from "framer-motion";
import cn from "classnames";

import styles from "./navMobile.module.scss";


const variants = {
    open: {
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(25px at 20px -50px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};




const MobilMenu = ({open, toggleOpen}) => {
    const {text} = useLanguage();

    const menuItem = [
        {path: "new", title: "new"},
        {path: "card", title: text.catalog},
        {path: "/about_us", title: text.aboutUs},
        {path: "/exchange", title: text.exchange_and_return},
        {path: "/contacts", title: text.contacts},
    ]

    const childVariants = {
        visible: {
            opacity: 1,
            x: 0,
        },
        hidden: {
            opacity: 0,
            x: -250,
        },
    }


    return (
        <motion.div
            variants={sidebar}
            className={cn(styles.mobile_menu, {[styles.not_display]: !open})}>
            <motion.div
                className={cn(styles.content, {[styles.hidden]: !open})}
                variants={variants}
            >
                <SearchForm open={open} variants={childVariants}/>
                <UserIdentificationMobil closeMenu={toggleOpen} open={open} variants={childVariants}/>
                {menuItem.map((item, i)=>(
                    <ItemMenu key={item.path} closeMenu={toggleOpen} path={item.path} title={item.title} open={open} variants={childVariants} delay={i*.1+.5}/>
                ))}
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
            </motion.div>
        </motion.div>
    );
};

export default MobilMenu;