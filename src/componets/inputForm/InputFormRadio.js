import React from 'react';

import styles from "./inputForm.module.scss";

const InputFormRadio = ({register, field, value, id, name, label, children}) => {
    return (
        <div className={styles.radio}>
            <input
                className={styles.input_radio}
                {...register(field)}
                type="radio"
                value={value}
                id={id}
                name={name}/>
            <label className={styles.radio_label} htmlFor={id}>{label} {children}</label>
        </div>
    );
};

export default InputFormRadio;