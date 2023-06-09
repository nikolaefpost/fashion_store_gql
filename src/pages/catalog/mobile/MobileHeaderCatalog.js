import React, {useEffect, useState} from 'react';
import {AiOutlineRight} from "react-icons/ai";
import filters from "../../../assets/icon/filters.svg";
import {useLanguage} from "../../../context/setting";
import cn from "classnames";
import SetSize from "../filterParams/SetSize";
import SetColor from "../filterParams/SetColor";
import SetPrice from "../filterParams/SetPrice";
import SortList from "../filterParams/SortList";
import HeaderInfo from "../HeaderInfo";
import {motion, AnimatePresence} from "framer-motion";

import styles from "./mobileCatalog.module.scss";

const MobileHeaderCatalog = ({inputMinMax, changePriseRange, currentColor, currentSize, sortingOption, length}) => {
    const {text} = useLanguage();
    const [openInfo, setOpenInfo] = useState(false)
    const [openSelect, setOpenSelect] = useState(false);

    useEffect(() => {
        if (currentSize || currentColor || changePriseRange || sortingOption) setOpenInfo(true);
        if (!currentSize && !currentColor && !changePriseRange && !sortingOption) setOpenInfo(false);
    }, [currentSize, currentColor, changePriseRange || sortingOption])
    return (
        <div className={styles.mobile_filter_wrapper}>
            <h3 className={styles.mobil_header} onClick={() => setOpenSelect(pre => !pre)}>
                <span>{text.filters}</span>
                <img src={filters} alt="filters"/>
                <span className={cn(styles.svg, {[styles.active_svg]: openSelect})}><AiOutlineRight/></span>
            </h3>
            <AnimatePresence>
                {openSelect && <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    className={styles.collapse_list}
                >
                    <SetSize/>
                    <SetColor/>
                    <SetPrice/>
                    <SortList/>
                </motion.div>}
            </AnimatePresence>

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

export default MobileHeaderCatalog;