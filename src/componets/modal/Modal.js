import React from 'react';
import {AiOutlineClose} from "react-icons/ai"
import Portal from "./Portal";

import styles from "./modal.module.scss"

const Modal = ({fn, children}) => {

    return (
        <Portal>
            <div className={styles.modal}>
                <div className={styles.wrapper}/>
                <div className={styles.content}>
                    <span onClick={fn} className={styles.cross}><AiOutlineClose/></span>
                    {children}
                </div>
            </div>
        </Portal>


    );
};

export default Modal;