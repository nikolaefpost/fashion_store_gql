import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import cn from "classnames";
import {observer} from "mobx-react-lite";
import rootStore from "../../../store/rootStore";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";

import styles from "../catalog.module.scss";

const colorList =["white", "grey", "beige"];

const SetColor = () => {
    const {productStore} = rootStore;
    const [openColor, setOpenColor] = useState(false);
    const colorRef = useRef(null);
    useOnClickOutside(colorRef, ()=>setOpenColor(false));

    const closeModal = (e,param) => {
        e.stopPropagation()
        productStore.setCurrentColor(param);
        setOpenColor(false)
    }
    return (
        <div className={styles.header_block} onClick={()=>setOpenColor(true)}>
            <span className={styles.header_title}>Цвет</span>
            <AiOutlineDown/>
            {openColor && <div ref={colorRef} className={styles.modal_size}>
                {colorList.map(el=>(
                    <div
                        key={el}
                        className={cn(styles.circle, styles[el])}
                        onClick={(e)=>closeModal(e,el)}
                    />
                ))}

            </div>}
        </div>
    );
};

export default observer(SetColor);