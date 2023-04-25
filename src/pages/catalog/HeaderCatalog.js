import React, {useEffect, useState} from 'react';
import cn from "classnames";
import SetSize from "./filterParams/SetSize";
import SetColor from "./filterParams/SetColor";
import {observer} from "mobx-react-lite";
import SetPrice from "./filterParams/SetPrice";
import SortList from "./filterParams/SortList";
import {useReactiveVar} from "@apollo/client";
import {
    productChangePriseRange,
    productCurrentColorVar,
    productCurrentSizeVar,
    productInputMinMax,
    productSortingOption
} from "../../appolo/cashe/appVar";
import {resetFilter} from "../../appolo/operations/poducts/productStore";

import styles from "./catalog.module.scss";


const HeaderCatalog = ({length}) => {
    const [openInfo, setOpenInfo] = useState(false)
    const currentSize = useReactiveVar(productCurrentSizeVar);
    const currentColor = useReactiveVar(productCurrentColorVar);
    const changePriseRange = useReactiveVar(productChangePriseRange);
    const inputMinMax = useReactiveVar(productInputMinMax);
    const sortingOption = useReactiveVar(productSortingOption);


    useEffect(() => {
        if (currentSize || currentColor || changePriseRange || sortingOption) setOpenInfo(true);
        if (!currentSize && !currentColor && !changePriseRange && !sortingOption) setOpenInfo(false);
    }, [currentSize, currentColor, changePriseRange || sortingOption])

    const reset = () => {
        setOpenInfo(false);
        resetFilter();
    }

    return (
        <div className={styles.header}>
            <SetSize/>
            <SetColor/>
            <SetPrice/>
            <SortList/>
            {openInfo && <div className={styles.info}>
                Выбрано {length} товаров
                <span className={styles.selected} onClick={reset}>Cбросить</span>
                {currentSize && <span className={styles.selected}>{currentSize}</span>}
                {currentColor && <div className={styles.selected_color}>
                    <div className={cn(styles.circle, styles[currentColor])}/>
                </div>}
                {changePriseRange && <>
                    <div className={styles.selected}>от:
                        <span>{inputMinMax.min}</span> гр.
                    </div>
                    <div className={styles.selected}> до:
                        <span>{inputMinMax.max}</span> гр.
                    </div>
                </>}
                {sortingOption && <span className={styles.selected}>{sortingOption.name}</span>}
            </div>}
        </div>
    );
};

export default observer(HeaderCatalog);