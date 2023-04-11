import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import {observer} from "mobx-react-lite";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";

import styles from "../catalog.module.scss";
import {applyFilter, setSize} from "../../../appolo/operations/poducts/productMutations";

const sizeList = ["XXL", "XXS", "XS", "S", "L"]

const SetSize = () => {
    const [openSize, setOpenSize] = useState(false);
    const sizeRef = useRef(null);
    useOnClickOutside(sizeRef, ()=>setOpenSize(false));

    const closeModal = (e,param) => {
        e.stopPropagation()
        setSize(param);
        applyFilter()
        setOpenSize(false)
    }
    return (
        <div className={styles.header_block} onClick={()=>setOpenSize(true)}>
            <span className={styles.header_title}>Размер</span>
            <AiOutlineDown/>
            {openSize && <div className={styles.modal_size} ref={sizeRef}>
                {sizeList.map(el=>(
                    <span key={el} onClick={(e)=>closeModal(e,el)}>{el}</span>
                ))}

            </div>}
        </div>
    );
};

export default observer(SetSize);