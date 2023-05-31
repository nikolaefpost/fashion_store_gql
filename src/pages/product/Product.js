import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ProductCard from "../../componets/productCard/ProductCard";
import {getRecentlyWatched, recentlyWatchedSave} from "../../helpers/recentlyWatchedSave";
import {handlerScrollUp} from "../../helpers/handlerScrollUp";
import OtherImage from "./OtherImage";
import {filterCategory, getProduct} from "../../appolo/operations/poducts/productStore";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {setProducts} from "../../appolo/operations/order/orderStore";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";
import {useMediaQuery} from "../../helpers/useMediaQuery";

import styles from "./product.module.scss";


const Product = () => {
    const isMobile = useMediaQuery(1000);
    const isTablet = useMediaQuery(1000, 500);
    const {text, lang} = useLanguage();
    let {cardId} = useParams();
    const {data: product} = useQuery(GET_PRODUCT_LOCAL);
    const saved = getRecentlyWatched();
    const dataWhile = product?.productList.slice(1, 3);
    const dataAdditional = product?.productList.slice(0, 4);
    const dataLike = product?.productList.slice(0, 4);
    const dataRecentlyWatched = saved.map(id => product?.productList.find(el => el.id === id));
    const currentProduct = getProduct(cardId);
    console.log(dataRecentlyWatched)

    const navigate = useNavigate();
    const handleTransition = (id) => {
        recentlyWatchedSave(id);
        navigate(`/card/${id}`)
    }

    const handleTransitionCategory = () => {
        navigate("/card");
        filterCategory(currentProduct?.category?.category)
    }

    const styleX = isMobile ? {width: "165px", height: "326px"}: {width: "370px", height: "501px"}
    const styleL = isMobile ? {width: "165px", height: "326px"}: {width: "274px", height: "401px"}

    handlerScrollUp();
    return (
        <div className={styles.content}>
            <NavBlock
                namePage={text.catalog}
                currentCategory={lang === "Eng" ?
                    currentProduct?.category?.category : currentProduct?.category?.category_ua}
                handlerResetCategory={handleTransitionCategory}
                currentProduct={lang === "Eng" ? currentProduct?.name : currentProduct?.name_ua}
            />
            <ProductCard
                product={currentProduct}
                setProduct={setProducts}
                cardId={cardId}
                isTablet={isTablet}
            />
            {product?.productList.length &&
                <>
                    <OtherImage title={text.whole_image} handleTransition={handleTransition} style={styleX}
                                data={dataWhile}/>
                    <OtherImage title={text.complete_look} handleTransition={handleTransition} style={styleL}
                                data={dataAdditional}/>
                    <OtherImage title={text.may_like} handleTransition={handleTransition} style={styleL}
                                data={dataLike}/>
                    {dataRecentlyWatched.length > 0 && <OtherImage title={text.recently_viewed} handleTransition={handleTransition} style={styleL}
                                 data={dataRecentlyWatched}/>}
                </>}
        </div>
    );
};

export default Product;