import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import rootStore from "../../store/rootStore";

import styles from "./rangeSlider.module.scss"


const RangeSlider = () => {
    const {productStore} = rootStore;
    const [onStartMinMove, setOnStartMinMove] = useState(false);
    const [onStartMaxMove, setOnStartMaxMove] = useState(false);
    const lineRange = useRef(null);
    const leftMarker = useRef(null);
    const rightMarker = useRef(null);

    const minMove = (event) => {
        const pos = lineRange.current.getBoundingClientRect()
        if ((event.clientX - pos.x) > 8
            && event.clientX - pos.x < parseInt(rightMarker.current.style.left, 10) - 8
        ) productStore.setMinPrice(event.clientX - pos.x - 8)
    }

    const maxMove = (event) => {
        const pos = lineRange.current.getBoundingClientRect()
        if (
            (event.clientX - pos.x) < 192 &&
            event.clientX - pos.x > parseInt(leftMarker.current.style.left, 10) + 24
        ) productStore.setMaxPrice(event.clientX - pos.x - 8)
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
        productStore.setInputMinPrice(value)

    }

    const handleChangeMax = (e) => {
        let value = parseInt(e.target.value, 10);
        if (typeof value === "number") productStore.setInputMaxPrice(value)
        else productStore.setInputMaxPrice(0)
    }


    return (
        <div className={styles.container}>
            <div className={styles.input_block}>
                <span>Мин</span>
                <input
                    value={productStore.sortInputMinMax.min}
                    onChange={handleChangeMin}
                    type="text"/>
                <input
                    value={productStore.sortInputMinMax.max}
                    onChange={handleChangeMax}
                    type="text"
                />
                <span>Мах</span>
            </div>
            <div ref={lineRange} className={styles.line}>
                <div
                    onMouseUp={()=>setOnStartMinMove(false)}
                    onMouseDown={()=>setOnStartMinMove(true)}
                    ref={leftMarker}
                    className={styles.marker_range}
                    style={{left: productStore.sortMinMax.min}}
                />
                <div
                    onMouseUp={()=>setOnStartMaxMove(false)}
                    onMouseDown={()=>setOnStartMaxMove(true)}
                    ref={rightMarker}
                    className={styles.marker_range}
                    style={{left: productStore.sortMinMax.max}}
                />
            </div>
        </div>
    );
};

export default observer(RangeSlider);