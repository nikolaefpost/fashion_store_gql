import React, {useState} from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";
import {motion} from "framer-motion";

const variants = {
    open: {
        height: 'auto',
        transition: {
            delay: .3,
            duration: .5
        }
    },
    closed: {
        height: 0,
        transition: {
            delay: .3,
            duration: .2
        }
    }
};

import styles from "./productCard.module.scss";

const Description = ({title, children}) => {

    const [descr, setDescr] = useState(false);
    return (
        <div

            className={styles.description_element}
        >
            <div className={styles.desc_content} onClick={()=>setDescr(pre=>!pre)}>
                <h4>{title}</h4>
                <div className={cn(styles.svg, {[styles.rotate_svg]:descr})}><AiOutlineRight/></div>
            </div>
             <motion.div
                 className={styles.hidden_text}
                 initial={false}
                 animate={descr ? 'open' : 'closed'}
                 variants={variants}
                 transition={{ease: 'easeOut'}}
             >{children}</motion.div>
            <hr/>
        </div>
    );
};

export default Description;