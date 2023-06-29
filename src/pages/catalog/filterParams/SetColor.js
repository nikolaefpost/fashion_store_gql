import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import cn from "classnames";
import {observer} from "mobx-react-lite";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";
import {useQuery} from "@apollo/client";
import {GET_COLOR} from "../../../appolo/operations/poducts/productGrapfQgl";
import {applyFilter, setColor} from "../../../appolo/operations/poducts/productStore";
import {motion, AnimatePresence} from "framer-motion";
import {useLanguage} from "../../../context/setting";

import styles from "../catalog.module.scss";


const SetColor = () => {
    const {text} = useLanguage();
    const {data, loading, error} = useQuery(GET_COLOR);
    const [openColor, setOpenColor] = useState(false);
    const colorRef = useRef(null);
    useOnClickOutside(colorRef, ()=>setOpenColor(false));

    const closeModal = (e,param) => {
        e.stopPropagation()
        setColor(param.id);
        applyFilter();
        setOpenColor(false)
    }
    if (error) return <h2>ERROR!</h2>
    return (
        <div className={styles.header_block} onClick={()=>setOpenColor(true)}>
            <span className={styles.header_title}>{text.color}</span>
            <span className={cn(styles.svg, {[styles.active_svg]: openColor})}><AiOutlineDown/></span>
            <AnimatePresence>
            {openColor && <motion.div
                initial={{height: 0, opacity: 0}}
                animate={{height: 'auto', opacity: 1}}
                exit={{height: 0, opacity: 0}}
                ref={colorRef} className={styles.modal_size}>
                {loading && <div>Loading ... </div>}
                {data && data?.queryColor.map(el=>(
                    <div
                        key={el.id}
                        className={cn(styles.circle, styles[el.id])}
                        onClick={(e)=>closeModal(e,el)}
                    />
                ))}

            </motion.div>}
                </AnimatePresence>
        </div>
    );
};

export default observer(SetColor);