import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {AiOutlineRight} from "react-icons/ai";
import rootStore from "../../store/rootStore";
import {observer} from "mobx-react-lite";
import ProductCard from "../../componets/productCard/ProductCard";
import {getRecentlyWatched, recentlyWatchedSave} from "../../helpers/recentlyWatchedSave";
import {handlerScrollUp} from "../../helpers/handlerScrollUp";
import {Error404} from "../index";

import styles from "./product.module.scss";
import OtherImage from "./OtherImage";

const styleX = {width: "370px", height: "501px"}
const styleL = {width: "274px", height: "401px"}


const Product = () => {
    let {cardId} = useParams();
    const {productStore, orderStore} = rootStore;
    const saved = getRecentlyWatched();
    const dataWhile = productStore.product.slice(5,7);
    const dataAdditional = productStore.product.slice(11,15);
    const dataLike = productStore.product.slice(1,5);
    const dataRecentlyWatched = saved.map(id => productStore.product.find(el => el.id === id));
    const currentProduct = productStore.getProduct(parseInt(cardId));

    const navigate = useNavigate();
    const handleTransition = (id) => {
        recentlyWatchedSave(id);
        navigate(`/card/${id}`)
    }

    const handleTransitionCategory = () => {
        navigate("/card");
        productStore.filterCategory(currentProduct.category)
    }

    if(!/^[1-9]+\d*$/.test(cardId) || currentProduct === undefined) return <Error404/>;

    handlerScrollUp();
    return (
        <div className={styles.content}>
            <div className={styles.nav_block}>
                <span onClick={()=>navigate("/")}>Главная</span>
                <AiOutlineRight/>
                <span onClick={()=>navigate("/card")}>Каталог</span>
                <AiOutlineRight/>
                <span onClick={handleTransitionCategory}>{currentProduct?.category}</span>
                <AiOutlineRight/>
                <span>{currentProduct?.title}</span>
            </div>
            <ProductCard
                product={currentProduct}
                dataWhile={dataWhile}
                dataAdditional={dataAdditional}
                dataLike={dataLike}
                dataRecentlyWatched={dataRecentlyWatched}
                handleTransition={handleTransition}
                setProduct={orderStore.setProducts}
                cardId={cardId}
            />
            <OtherImage title="Весь образ" handleTransition={handleTransition} style={styleX} data={dataWhile}/>
            <OtherImage title="Дополните образ" handleTransition={handleTransition} style={styleL}
                        data={dataAdditional}/>
            <OtherImage title="Вам может понравиться" handleTransition={handleTransition} style={styleL}
                        data={dataLike}/>
            <OtherImage title="Вы недавно смотрели" handleTransition={handleTransition} style={styleL}
                        data={dataRecentlyWatched}/>
        </div>
    );
};

export default observer(Product);