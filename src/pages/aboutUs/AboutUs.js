import React from 'react';
import NavBlock from "../../componets/navBlock/NavBlock";
import {useLanguage} from "../../context/setting";
import {motion, AnimatePresence} from "framer-motion";

import styles from "./aboutUs.module.scss";

const AboutUs = () => {
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
                <NavBlock namePage={text.aboutUs}/>
                <h3>{text.aboutUs}</h3>
            </motion.div>
        </AnimatePresence>
    );
};

export default AboutUs;