import React from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import {motion, AnimatePresence} from "framer-motion";
import styles from "../productCard.module.scss";
import {useLanguage} from "../../../context/setting";


const SelectSize = ({
                        openSelect,
                        setOpenSelect,
                        sizeProduct,
                        setSizeProduct,
                        sizeError,
                        setSizeError,
                        size,
                        lessTablet
                    }) => {

    const variants = {
        open: {
            height: 'auto',
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.2,
            }
        },
        closed: {
            type: "spring",
            height: lessTablet ? 40 : 53,
            transition: {
                when: 'afterChildren',
                staggerChildren: 0.2,
            },
        }
    };
    const {text} = useLanguage();
    const handleSetSizeProduct = (el) => {
        setSizeProduct(el);
        setSizeError(false)
    }

    return (
        <motion.div
            className={cn(styles.select, {[styles.error_select]: sizeError})} onClick={() => setOpenSelect(pre => !pre)}
            animate={openSelect ? 'open' : 'closed'}
            variants={variants}
            initial={false}
            // transition={{ease: 'easeOut'}}
        >
            <div className={styles.select_padding}>
            {sizeProduct}
            <span className={cn(styles.svg, {[styles.active_svg]: openSelect})}><AiOutlineRight/></span>
            <AnimatePresence>
                {openSelect && <ul
                >
                    {size?.map((el, i) => (
                        <motion.li
                            key={el}
                            onClick={() => handleSetSizeProduct(el)}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{delay: 0.1 + i * .1}}
                        >{el}</motion.li>
                    ))}
                </ul>}
            </AnimatePresence>
            {sizeError && <div className={styles.error}>{text.select_size}!</div>}
            </div>
        </motion.div>

    );
};

export default SelectSize;