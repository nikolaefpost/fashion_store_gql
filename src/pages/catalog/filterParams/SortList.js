import React, {useRef, useState} from 'react';
import {AiOutlineDown} from "react-icons/ai";
import {useOnClickOutside} from "../../../hooks/useOnclickOutside";
import rootStore from "../../../store/rootStore";
import {observer} from "mobx-react-lite";
import cn from "classnames";

import styles from "../catalog.module.scss";

const sortOption = [
    {id: 0, name: "по рейтингу"},
    {id: 1, name: "по возрастанию цены"},
    {id: 2, name: "по убыванию цены"}
]

const SortList = () => {
    const {productStore} = rootStore;
    const [openSort, setOpenSort] = useState(false);
    const sortRef = useRef(null);
    useOnClickOutside(sortRef, ()=>setOpenSort(false));

    const closeModal = (e,param) => {
        e.stopPropagation()
        productStore.setSortingOption(param);
        productStore.sortListByOption();
        setOpenSort(false)
    }
    return (
        <div className={styles.header_block} onClick={()=>setOpenSort(true)}>
            <span className={styles.header_title}>Сортировать по</span>
            <AiOutlineDown/>
            {openSort && <div ref={sortRef} className={cn(styles.modal_size, styles.sort_field)}>
                {sortOption.map(el=>(
                    <span key={el.id} onClick={(e)=>closeModal(e,el)}>{el.name}</span>
                ))}
            </div>}
        </div>
    );
};

export default observer(SortList);