import React  from 'react';
import DesktopSidebar from "./desktop/DesktopSidebar";
import ProductList from "./ProductList";
import {categoryCurrentVar} from "../../appolo/cashe/appVar";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_CATEGORY_LOCAL, GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {filterCategory} from "../../appolo/operations/poducts/productStore";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";
import {useMediaQuery} from "../../helpers/useMediaQuery";
import MobilSidebar from "./mobile/MobilSidebar";
import Header from "./Header";
import { motion } from "framer-motion";

import styles from "./catalog.module.scss";




const Catalog = () => {
    const {text, lang} = useLanguage();
    const isMobile = useMediaQuery(500);
    const isTablet = useMediaQuery(1000);
    
    const handlerResetCategory  = () => {
        filterCategory(null)
    }

    const { data: category } = useQuery(GET_CATEGORY_LOCAL);
    const { data: product } = useQuery(GET_PRODUCT_LOCAL);


    const currentCategory = useReactiveVar(categoryCurrentVar);

    return (
        <motion.div
            // layout
            animate={{ opacity: 1 }}
            transition={{
                opacity: { ease: "linear" },
                layout: { duration: 0.5 }
            }}
            // animate={{ opacity: 1 }}
            className={styles.content}>
            <NavBlock
                namePage={text.catalog}
                currentCategory={lang === "Eng" ? currentCategory?.category : currentCategory?.category_ua}
                // currentCategory={currentCategory}
                handlerResetCategory={handlerResetCategory}
            />
            <div className={styles.product_grid}>
                {!isMobile?
                    <DesktopSidebar category={category?.categoryLocal} sort={filterCategory}/>:
                    <MobilSidebar category={category?.categoryLocal} sort={filterCategory} current={currentCategory}/>
                }
                {product && <Header length={product.productList.length} isMobile={isMobile}/> }
                <ProductList isMobile={isTablet} products={product?.productList? product?.productList: []}/>

            </div>
        </motion.div>
    );
};

export default Catalog;