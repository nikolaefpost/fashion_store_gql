import React from 'react';
import {AiOutlineRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../context/setting";
import cn from "classnames";

import styles from "./navBlock.module.scss"


const NavBlock = ({namePage, currentCategory, handlerResetCategory, handleTransitionCategory, currentProduct}) => {
    const {text} = useLanguage();
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/")
    }
    return (
        <div>
            <div className={styles.nav_block}>
                <span onClick={handleHome}>{text.home}</span>
                <AiOutlineRight/>
                <span onClick={handlerResetCategory}>{namePage}</span>
                {currentCategory && <>
                    <AiOutlineRight/>
                    <span
                        className={cn(styles.nav_category, {[styles.color_accent]: currentProduct})}
                        onClick={handleTransitionCategory}
                    >{currentCategory}</span>
                </>}
                {currentProduct && <> <AiOutlineRight/> <span className={styles.nav_category}>{currentProduct}</span></>}
            </div>
        </div>
    );
};

export default NavBlock;