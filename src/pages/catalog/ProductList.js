import React from 'react';
import {useNavigate} from "react-router-dom";
import ProductListCard from "../../componets/productCard/ProductListCard";
import {recentlyWatchedSave} from "../../helpers/recentlyWatchedSave";

import styles from "./catalog.module.scss";


const ProductList = ({products}) => {

    const navigate = useNavigate();
    const handleTransition = (id) => {
        console.log(`${id}`)
        recentlyWatchedSave(id)
         navigate(`${id}`)
    }
    const styleM ={width: "310px", height: "499px"}

    return (
        <div className={styles.body}>
            {products.map(item => (
                <ProductListCard key={item.id} data={item} style={styleM} handleTransition={handleTransition}   />
            ))}
        </div>
    );
};

export default ProductList;