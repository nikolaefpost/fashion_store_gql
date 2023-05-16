import React, {useState} from 'react';
import {AiOutlineRight, AiOutlineLeft} from "react-icons/ai"
import cn from "classnames";
import HomeSliderCard from "./HomeSliderCard";
import {useQuery} from "@apollo/client";
import {GET_CATEGORY_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";

import styles from "./home.module.scss";
import {useMediaQuery} from "../../helpers/useMediaQuery";

const HomeSlider = () => {
    const isMobile = useMediaQuery(500);
    const { data } = useQuery(GET_CATEGORY_LOCAL);
    let doubleData = data? [...data.categoryLocal].concat(...data.categoryLocal): [];
    const sliderParam = isMobile? {shiftStep: 170, gap: 5, padding: 40} : {shiftStep: 290, gap: 15, padding: 300}
    const fullWidth = doubleData.length * sliderParam.shiftStep - sliderParam.gap;
    const screenWidth = window.screen.width;

    const [shift, setShift] = useState(0)
    const endShifting = (fullWidth + shift) > (screenWidth - sliderParam.padding)

    const next = () => {
        if ((fullWidth + shift) > (screenWidth - sliderParam.padding)) setShift(prev => prev - sliderParam.shiftStep)
    }

    const prev = () => {
        if (shift<0) setShift(prev => prev + sliderParam.shiftStep)
    }
    


    return (
        <div className={styles.slider}>
            <div className={styles.shift_elements} style={{left: shift, transition: "all 1s ease-out"}}>
                {doubleData.map((item, i)=>(
                    <HomeSliderCard card={item} key={i} />
                ))}
            </div>
            {endShifting && <div className={cn(styles.control, styles.right)} onClick={next}><AiOutlineRight/></div>}
            {shift !==0 && <div className={cn(styles.control, styles.left)} onClick={prev}><AiOutlineLeft/></div>}
        </div>
    );
};

export default HomeSlider;