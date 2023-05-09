import React  from 'react';
import Sidebar from "./Sidebar";
import HeaderCatalog from "./HeaderCatalog";
import ProductList from "./ProductList";
import {categoryCurrentVar} from "../../appolo/cashe/appVar";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_CATEGORY_LOCAL, GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {filterCategory} from "../../appolo/operations/poducts/productStore";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./catalog.module.scss";




const Catalog = () => {
    const {text} = useLanguage();
    
    const handlerResetCategory  = () => {
        filterCategory("")
    }

    const { data: category } = useQuery(GET_CATEGORY_LOCAL);
    const { data: product } = useQuery(GET_PRODUCT_LOCAL);

    const currentCategory = useReactiveVar(categoryCurrentVar);

    return (
        <div className={styles.content}>
            <NavBlock
                namePage={text.catalog}
                currentCategory={currentCategory}
                handlerResetCategory={handlerResetCategory}
            />
            {/*<div className={styles.nav_block}>*/}
            {/*    <span onClick={handleHome}>{text.home}</span>*/}
            {/*    <AiOutlineRight/>*/}
            {/*    <span*/}
            {/*        onClick={handlerResetCategory}*/}
            {/*    >{text.catalog}</span>*/}
            {/*    {currentCategory && <>*/}
            {/*        <AiOutlineRight/>*/}
            {/*        <span className={styles.nav_category}>{currentCategory}</span>*/}
            {/*    </>}*/}
            {/*</div>*/}
            <div className={styles.product_grid}>

                <div className={styles.title}>{text.catalog}</div>
                {product && <HeaderCatalog length={product.productList.length}/>}
                <ProductList products={product?.productList? product?.productList: []}/>
                <Sidebar category={category?.categoryLocal} sort={filterCategory}/>

            </div>
        </div>
    );
};

export default Catalog;