import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import cn from "classnames";
import {observer} from "mobx-react-lite";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";
import {useQuery} from "@apollo/client";
import {GET_COLOR} from "../../../appolo/operations/poducts/productGrapfQgl";
import {applyFilter, setColor} from "../../../appolo/operations/poducts/productStore";

import styles from "../catalog.module.scss";
import {useLanguage} from "../../../context/setting";

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
            {openColor && <div ref={colorRef} className={styles.modal_size}>
                {loading && <div>Loading ... </div>}
                {data && data?.queryColor.map(el=>(
                    <div
                        key={el.id}
                        className={cn(styles.circle, styles[el.id])}
                        onClick={(e)=>closeModal(e,el)}
                    />
                ))}

            </div>}
        </div>
    );
};

export default observer(SetColor);