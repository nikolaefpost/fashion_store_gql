import React from 'react';
import {Link} from "react-router-dom";

import styles from "./error404.module.scss";

const Error404 = () => {

    return (
        <div className={styles.text}>
            <span>Page not found</span>
           <div> ⟵ return to <Link to="/"> Home</Link></div>
        </div>
    );
};

export default Error404;