import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import {observer} from "mobx-react-lite";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";
import {applyFilter, setSize} from "../../../appolo/operations/poducts/productStore";
import {useLanguage} from "../../../context/setting";
import cn from "classnames";
import {motion, AnimatePresence} from "framer-motion";

import styles from "../catalog.module.scss";

const sizeList = ["XXL", "XXS", "XS", "S", "L"]

const SetSize = () => {
    const {text} = useLanguage();
    const [openSize, setOpenSize] = useState(false);
    const sizeRef = useRef(null);
    useOnClickOutside(sizeRef, () => setOpenSize(false));

    const closeModal = (e, param) => {
        e.stopPropagation()
        setSize(param);
        applyFilter()
        setOpenSize(false)
    }
    return (
        <div className={styles.header_block} onClick={() => setOpenSize(pre => !pre)}>
            <span className={styles.header_title}>{text.size}</span>
            <span className={cn(styles.svg, {[styles.active_svg]: openSize})}><AiOutlineDown/></span>
            <AnimatePresence>
                {openSize && <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    // transition={{duration: 2}}
                    className={styles.modal_size} ref={sizeRef}>
                    {sizeList.map(el => (
                        <span key={el} onClick={(e) => closeModal(e, el)}>{el}</span>
                    ))}

                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default observer(SetSize);