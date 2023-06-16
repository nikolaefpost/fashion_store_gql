import React from 'react';
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";
import {motion, AnimatePresence} from "framer-motion";

import styles from "./bonusSystem.module.scss";

const BonusSystem = () => {
    const {text} = useLanguage();
    return (
        <AnimatePresence>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}
            >
                <NavBlock namePage={text.bonus_system}/>
                <h3>{text.bonus_system}</h3>
            </motion.div>
        </AnimatePresence>
    );
};

export default BonusSystem;