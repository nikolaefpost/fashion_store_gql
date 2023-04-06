import React, {useState} from 'react';
import {AiOutlineRight, AiOutlineLeft} from "react-icons/ai"
import {category1, category2, category3, category4} from "../../assets/img";
import cn from "classnames";

import styles from "./home.module.scss";

const category = {
    electronics: category1,
    jewelery: category2,
    ["men's clothing"]: category3,
    ["women's clothing"]: category4
}

const HomeSlider = ({data}) => {
    let doubleData = [...data].concat(...data);
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
                    <div key={i} className={styles.element}>
                        <img src={category[item]} alt="category" />
                        <div className={styles.name}>{item}</div>
                    </div>
                ))}
            </div>

            <div className={cn(styles.control, styles.right)} onClick={next}><AiOutlineRight/></div>
            {shift !==0 && <div className={cn(styles.control, styles.left)} onClick={prev}><AiOutlineLeft/></div>}
        </div>
    );
};

export default HomeSlider;