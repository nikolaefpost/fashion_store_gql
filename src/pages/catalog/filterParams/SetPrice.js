import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import RangeSlider from "../../../componets/rangeSlider/RangeSlider";
import rootStore from "../../../store/rootStore";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";

import styles from "../catalog.module.scss";

const SetPrice = () => {
    const {productStore} = rootStore;
    const [openPrice, setOpenPrice] = useState(false);
    const priceRef = useRef(null);
    useOnClickOutside(priceRef, ()=>setOpenPrice(false));

    const closeModal = (e) => {
        e.stopPropagation()
        setOpenPrice(false)
        productStore.sortPriceMinMax()
    }
    return (
        <div className={styles.header_block} onClick={()=>setOpenPrice(true)}>
            <span className={styles.header_title}>Цена</span>
            <AiOutlineDown/>
            {openPrice && <div ref={priceRef} className={styles.modal_size}>
                <RangeSlider/>
                <button onClick={closeModal}>Ок</button>
            </div>}
        </div>
    );
};

export default SetPrice;