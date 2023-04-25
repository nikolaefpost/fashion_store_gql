import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {AiOutlineRight} from "react-icons/ai";
import ProductCard from "../../componets/productCard/ProductCard";
import {getRecentlyWatched, recentlyWatchedSave} from "../../helpers/recentlyWatchedSave";
import {handlerScrollUp} from "../../helpers/handlerScrollUp";
import OtherImage from "./OtherImage";
import {filterCategory, getProduct} from "../../appolo/operations/poducts/productStore";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_LOCAL} from "../../appolo/operations/poducts/productGrapfQgl";
import {setProducts} from "../../appolo/operations/order/orderStore";

import styles from "./product.module.scss";


const styleX = {width: "370px", height: "501px"}
const styleL = {width: "274px", height: "401px"}


const Product = () => {
    let {cardId} = useParams();
    const {data: product} = useQuery(GET_PRODUCT_LOCAL);
    const saved = getRecentlyWatched();
    const dataWhile = product?.productList.slice(1, 3);
    const dataAdditional = product?.productList.slice(0, 4);
    const dataLike = product?.productList.slice(0, 4);
    const dataRecentlyWatched = saved.map(id => product?.productList.find(el => el.id === id));
    const currentProduct = getProduct(cardId);

    const navigate = useNavigate();
    const handleTransition = (id) => {
        recentlyWatchedSave(id);
        navigate(`/card/${id}`)
    }

    const handleTransitionCategory = () => {
        navigate("/card");
        filterCategory(currentProduct?.category?.category)
    }

    handlerScrollUp();
    return (
        <div className={styles.content}>
            <div className={styles.nav_block}>
                <span onClick={() => navigate("/")}>Главная</span>
                <AiOutlineRight/>
                <span onClick={() => navigate("/card")}>Каталог</span>
                <AiOutlineRight/>
                <span onClick={handleTransitionCategory}>{currentProduct?.category?.category}</span>
                <AiOutlineRight/>
                <span>{currentProduct?.name}</span>
            </div>
            <ProductCard
                product={currentProduct}
                dataWhile={dataWhile}
                dataAdditional={dataAdditional}
                dataLike={dataLike}
                dataRecentlyWatched={dataRecentlyWatched}
                setProduct={setProducts}
                cardId={cardId}
            />
            {product?.productList.length &&
                <>
                    <OtherImage title="Весь образ" handleTransition={handleTransition} style={styleX} data={dataWhile}/>
                    <OtherImage title="Дополните образ" handleTransition={handleTransition} style={styleL}
                                data={dataAdditional}/>
                    <OtherImage title="Вам может понравиться" handleTransition={handleTransition} style={styleL}
                                data={dataLike}/>
                    <OtherImage title="Вы недавно смотрели" handleTransition={handleTransition} style={styleL}
                                data={dataRecentlyWatched}/>
                </>}
        </div>
    );
};

export default Product;