import React from 'react';
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./navMobile.module.scss";

const ItemMenu = ({closeMenu, path, title, open, variants, delay}) => {
    return (
        <motion.div
            onClick={closeMenu}
            animate={open ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ delay: delay, ease: 'easeOut' }}
        >
            <Link to={path} className={styles.item_menu}>{title}</Link>
        </motion.div>
    );
};

export default ItemMenu;