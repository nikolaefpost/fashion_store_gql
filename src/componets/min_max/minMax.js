import React, { useState} from 'react';
import PropTypes from "prop-types";

const MinMax = ({
                    min = 1,
                    max = 10,
                    cnt,
                    changeCnt
                }) => {

    const [count, setCount] = useState(cnt);
    const applyCurrent = (num) => {
        let calcNum = Math.max(min, Math.min(max, num))
        setCount(calcNum);
        changeCnt(calcNum)
    }

    const incr = () => applyCurrent(count + 1)

    const decr = () => applyCurrent(count - 1)

    const handleChangeInput = (e) => {
        if (typeof +e.target.value === 'number' && !isNaN(+e.target.value )) {
            setCount(e.target.value);

            // setTimeout(() => {
            //     applyCurrent(e.target.value)
            // }, 2000)
        } else setCount(cnt)
    }

    const handleSaveInput = (e) => {
        if (e.key === "Enter" || e.type === "blur") applyCurrent(e.target.value)
    }

    return (
        <>
            <div>
                <button onClick={decr}>-</button>
                <input onChange={handleChangeInput} onBlur={handleSaveInput} onKeyDown={handleSaveInput} value={count}/>
                <button onClick={incr}>+</button>
            </div>
        </>
    );
};

MinMax.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    cnt: PropTypes.number.isRequired,
    changeCnt: PropTypes.func.isRequired,
}

export default MinMax;