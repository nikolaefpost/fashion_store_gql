import React from 'react';
import {Link} from "react-router-dom";
import styles from "./navMobile.module.scss";

const ItemMenu = ({closeMenu, path, title}) => {
    return (
        <div onClick={closeMenu}>
            <Link to={path} className={styles.item_menu}>{title}</Link>
        </div>
    );
};

export default ItemMenu;