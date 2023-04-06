import React, { useRef } from 'react';
import PropTypes from "prop-types";

import style from "./min_max.module.scss"

const MinMaxRef = ({
                    min = 1,
                    max = 10,
                    cnt,
                    changeCnt
                }) => {

    const refElement = useRef(null);

    const applyCurrent = (num) => {
        let calcNum = Math.max(min, Math.min(max, num))
        refElement.current.value = calcNum;
        changeCnt(calcNum)
    }

    const incr = () => applyCurrent(cnt + 1)

    const decr = () => applyCurrent(cnt - 1)

    const handleSaveInput = (e) => {
        if ((e.key === "Enter" || e.type === "blur") && parseInt(e.target.value) ) applyCurrent(parseInt(e.target.value) )
    }

    return (
        <>
            <div className={style.min_max}>
                <button className=""  onClick={decr}>-</button>
                <input ref={refElement}  onBlur={handleSaveInput} onKeyDown={handleSaveInput} defaultValue={cnt}/>
                <button className=""  onClick={incr}>+</button>
            </div>
        </>
    );
};

MinMaxRef.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    cnt: PropTypes.number.isRequired,
    changeCnt: PropTypes.func.isRequired,
}

export default MinMaxRef;