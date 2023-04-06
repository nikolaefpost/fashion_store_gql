import React, { useState} from 'react';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import cn from "classnames";

import styles from "./inputForm.module.scss"

const InputForm = ({register, errors, field, name , inputType, center}) => {
    const [type, setType] = useState(inputType);

    const onHidePassword = () => {
        setType(pre=>pre === "password" ? "text" : "password" )
    }

    return (
        <div className={styles.input_block}  key={field}>
            {!!errors[field] && <span className={styles.error}>{errors[field].message}</span>}
            <input
                className={cn({[styles.error_border]:errors[field]}, {[styles.center]: center})}
                type={type}
                placeholder={name}
                {...register(field)}
            />
            {field === "password" &&
                <span  onClick={onHidePassword}>{type === "password" ? <MdVisibility/> : <MdVisibilityOff/>}</span> }
        </div>
    );
};

export default InputForm;