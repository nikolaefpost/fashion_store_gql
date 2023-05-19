import React, {useEffect, useRef, useState} from 'react';
import {setInputMaxPrice, setInputMinPrice, setMaxPrice, setMinPrice}
    from "../../appolo/operations/poducts/productStore";
import {useReactiveVar} from "@apollo/client";
import {productInputMinMax, productMinMax} from "../../appolo/cashe/appVar";

import styles from "./rangeSlider.module.scss"


const RangeSlider = () => {

    const minMax = useReactiveVar(productMinMax);
    const inputMinMax = useReactiveVar(productInputMinMax);
    const [onStartMinMove, setOnStartMinMove] = useState(false);
    const [onStartMaxMove, setOnStartMaxMove] = useState(false);
    const lineRange = useRef(null);
    const leftMarker = useRef(null);
    const rightMarker = useRef(null);

    const minMove = (event) => {
        const pos = lineRange.current.getBoundingClientRect()
        if ((event.clientX - pos.x) > 8
            && event.clientX - pos.x < parseInt(rightMarker.current.style.left, 10) - 8
        ) setMinPrice(event.clientX - pos.x - 8)
    }

    const maxMove = (event) => {
        const pos = lineRange.current.getBoundingClientRect()
        if (
            (event.clientX - pos.x) < 192 &&
            event.clientX - pos.x > parseInt(leftMarker.current.style.left, 10) + 24
        ) setMaxPrice(event.clientX - pos.x - 8)
    }
    const handleTouchMax = (event) => {
        const pos = lineRange.current.getBoundingClientRect()
        if (
            (event.targetTouches[0].clientX - pos.x) < 192 &&
            event.targetTouches[0].clientX - pos.x > parseInt(leftMarker.current.style.left, 10) + 24
        ) setMaxPrice(event.targetTouches[0].clientX - pos.x - 8)
    }

    const handleTouchMin = (event) => {
        const pos = lineRange.current.getBoundingClientRect()
        if ((event.targetTouches[0].clientX - pos.x) > 8
            && event.targetTouches[0].clientX - pos.x < parseInt(rightMarker.current.style.left, 10) - 8
        ) setMinPrice(event.targetTouches[0].clientX - pos.x - 8)
    }

    useEffect(() => {
        if (onStartMinMove) {
            leftMarker.current.addEventListener('mousemove', minMove);
        } else {
            leftMarker.current.removeEventListener("mousemove", minMove)
        }

        if (onStartMaxMove) {
            rightMarker.current.addEventListener('mousemove', maxMove);
        } else {
            rightMarker.current.removeEventListener("mousemove", maxMove)
        }

        return () => {
            leftMarker.current?.removeEventListener("mousemove", minMove)
            rightMarker.current?.removeEventListener("mousemove", maxMove)
        };
    }, [onStartMinMove, onStartMaxMove])

    const handleChangeMin = (e) => {
        let value = (e.target.value && (typeof parseInt(e.target.value, 10) === "number")) ? parseInt(e.target.value, 10) : 0;
        setInputMinPrice(value)

    }

    const handleChangeMax = (e) => {
        let value = parseInt(e.target.value, 10);
        if (typeof value === "number") setInputMaxPrice(value)
        else setInputMaxPrice(0)
    }


    return (
        <div className={styles.container}>
            <div className={styles.input_block}>
                <span>Мин</span>
                <input
                    value={inputMinMax.min}
                    onChange={handleChangeMin}
                    type="text"/>
                <input
                    value={inputMinMax.max}
                    onChange={handleChangeMax}
                    type="number"
                />
                <span>Мах</span>
            </div>
            <div ref={lineRange} className={styles.line}>
                <div
                    onTouchMove={handleTouchMin}
                    onMouseUp={() => setOnStartMinMove(false)}
                    onMouseDown={() => setOnStartMinMove(true)}
                    ref={leftMarker}
                    className={styles.marker_range}
                    style={{left: minMax.min}}
                />
                <div
                    onTouchMove={handleTouchMax}
                    onMouseUp={() => setOnStartMaxMove(false)}
                    onMouseDown={() => setOnStartMaxMove(true)}
                    ref={rightMarker}
                    className={styles.marker_range}
                    style={{left: minMax.max}}
                />
            </div>
        </div>
    );
};

export default RangeSlider;