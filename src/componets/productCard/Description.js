import React, {useState} from 'react';
import cn from "classnames";
import {AiOutlineRight} from "react-icons/ai";

import styles from "./productCard.module.scss";

const Description = ({title, children}) => {

    const [descr, setDescr] = useState(false);
    return (
        <div className={styles.description_element}>
            <div className={styles.desc_content} onClick={()=>setDescr(pre=>!pre)}>
                <h4>{title}</h4>
                <div className={cn(styles.svg, {[styles.rotate_svg]:descr})}><AiOutlineRight/></div>
            </div>
            {descr && <div className={styles.hidden_text}>{children}</div>}
            <hr/>
        </div>
    );
};

export default Description;