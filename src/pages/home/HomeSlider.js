import React, {useState} from 'react';
import {AiOutlineRight, AiOutlineLeft} from "react-icons/ai"
import cn from "classnames";
import HomeSliderCard from "./HomeSliderCard";
import {useQuery} from "@apollo/client";
import {GET_CATEGORY_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";

import styles from "./home.module.scss";

const HomeSlider = () => {
    const { data } = useQuery(GET_CATEGORY_LOCAL);
    let doubleData = data? [...data.categoryLocal].concat(...data.categoryLocal): [];
    const shiftStep = 290;
    const fullWidth = doubleData.length * shiftStep - 15;
    const screenWidth = window.screen.width;

    const [shift, setShift] = useState(0)

    const next = () => {
        if ((fullWidth + shift) > (screenWidth - 300)) setShift(prev => prev - shiftStep)
    }

    const prev = () => {
        if (shift<0) setShift(prev => prev + shiftStep)
    }
    


    return (
        <div className={styles.slider}>
            <div className={styles.shift_elements} style={{left: shift, transition: "all 1s ease-out"}}>
                {doubleData.map((item, i)=>(
                    <HomeSliderCard card={item} key={i} />
                ))}
            </div>
            <div className={cn(styles.control, styles.right)} onClick={next}><AiOutlineRight/></div>
            {shift !==0 && <div className={cn(styles.control, styles.left)} onClick={prev}><AiOutlineLeft/></div>}
        </div>
    );
};

export default HomeSlider;