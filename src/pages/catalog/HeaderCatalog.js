import React, {useEffect, useState} from 'react';
import cn from "classnames";
import SetSize from "./filterParams/SetSize";
import SetColor from "./filterParams/SetColor";
import {observer} from "mobx-react-lite";
import rootStore from "../../store/rootStore";
import SetPrice from "./filterParams/SetPrice";
import SortList from "./filterParams/SortList";

import styles from "./catalog.module.scss";


const HeaderCatalog = ({length}) => {
    const {productStore} = rootStore;
    const [openInfo, setOpenInfo] = useState(false)
    useEffect(() => {
        if (productStore.currentSize || productStore.currentColor || productStore.changePriseRange || productStore.sortingOption) setOpenInfo(true);
        if (!productStore.currentSize && !productStore.currentColor && !productStore.changePriseRange && !productStore.sortingOption) setOpenInfo(false);
    }, [productStore.currentSize, productStore.currentColor, productStore.changePriseRange || productStore.sortingOption])

    const reset = () => {
        setOpenInfo(false);
        productStore.reset();
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
                {productStore.currentSize && <span className={styles.selected}>{productStore.currentSize}</span>}
                {productStore.currentColor && <div className={styles.selected_color}>
                    <div className={cn(styles.circle, styles[productStore.currentColor])}/>
                </div>}
                {productStore.changePriseRange && <> <div className={styles.selected}>от:
                    <span>{productStore.sortInputMinMax.min}</span> гр.</div><div className={styles.selected}> до:
                    <span>{productStore.sortInputMinMax.max}</span> гр.</div>
                </>}
                {productStore.sortingOption && <span className={styles.selected}>{productStore.sortingOption.name}</span>}
            </div>}
        </div>
    );
};

export default observer(HeaderCatalog);