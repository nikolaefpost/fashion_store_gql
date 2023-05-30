import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";
import {observer} from "mobx-react-lite";
import cn from "classnames";
import {setSortingOption, sortListByOption} from "../../../appolo/operations/poducts/productStore";
import {useLanguage} from "../../../context/setting";

import styles from "../catalog.module.scss";


const SortList = () => {
    const {text} = useLanguage();
    const sortOption = [
        {id: 0, name: text.rising_price},
        {id: 1, name: text.rising_price}
        // {id: 2, name: "по рейтингу"},
    ]
    const [openSort, setOpenSort] = useState(false);
    const sortRef = useRef(null);
    useOnClickOutside(sortRef, () => setOpenSort(false));

    const closeModal = (e, param) => {
        e.stopPropagation()
        setSortingOption(param);
        sortListByOption();
        setOpenSort(false)
    }
    return (
        <div className={styles.header_block} onClick={() => setOpenSort(true)}>
            <span className={styles.header_title}>{text.sort_by}</span>
            <span className={cn(styles.svg, {[styles.active_svg]: openSort})}><AiOutlineDown/></span>
            {openSort && <div ref={sortRef} className={cn(styles.modal_size, styles.sort_field)}>
                {sortOption.map(el => (
                    <span key={el.id} onClick={(e) => closeModal(e, el)}>{el.name}</span>
                ))}
            </div>}
        </div>
    );
};

export default observer(SortList);