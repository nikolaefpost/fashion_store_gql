import React, {useEffect, useState} from 'react';
import SetSize from "../filterParams/SetSize";
import SetColor from "../filterParams/SetColor";
import SetPrice from "../filterParams/SetPrice";
import SortList from "../filterParams/SortList";
import HeaderInfo from "../HeaderInfo";

import styles from "../catalog.module.scss";


const DesktopHeaderCatalog = ({length, changePriseRange, currentColor, currentSize, inputMinMax, sortingOption}) => {
    const [openInfo, setOpenInfo] = useState(false)

    useEffect(() => {
        if (currentSize || currentColor || changePriseRange || sortingOption) setOpenInfo(true);
        if (!currentSize && !currentColor && !changePriseRange && !sortingOption) setOpenInfo(false);
    }, [currentSize, currentColor, changePriseRange || sortingOption])

    return (
        <div className={styles.header}>
            <SetSize/>
            <SetColor/>
            <SetPrice/>
            <SortList/>
            {openInfo && <HeaderInfo
                length={length} setOpenInfo={setOpenInfo}
                currentSize={currentSize}
                currentColor={currentColor}
                changePriseRange={changePriseRange}
                inputMinMax={inputMinMax}
                sortingOption={sortingOption}
            />}
        </div>
    );
};

export default DesktopHeaderCatalog;