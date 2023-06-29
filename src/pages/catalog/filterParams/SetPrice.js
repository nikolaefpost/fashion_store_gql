import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import RangeSlider from "../../../componets/rangeSlider/RangeSlider";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";
import {applyFilter} from "../../../appolo/operations/poducts/productStore";
import {useLanguage} from "../../../context/setting";
import cn from "classnames";
import {motion, AnimatePresence} from "framer-motion";

import styles from "../catalog.module.scss";

const SetPrice = () => {
    const {text} = useLanguage();
    const [openPrice, setOpenPrice] = useState(false);
    const priceRef = useRef(null);
    useOnClickOutside(priceRef, () => setOpenPrice(false));

    const closeModal = (e) => {
        e.stopPropagation()
        setOpenPrice(false)
        applyFilter()
    }
    return (
        <div className={styles.header_block} onClick={() => setOpenPrice(true)}>
            <span className={styles.header_title}>{text.price}</span>
            <span className={cn(styles.svg, {[styles.active_svg]: openPrice})}><AiOutlineDown/></span>
            <AnimatePresence>
                {openPrice && <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    ref={priceRef}
                    className={cn(styles.modal_size, styles.extend_price)}
                >
                    <RangeSlider/>
                    <button onClick={closeModal}>Ок</button>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default SetPrice;