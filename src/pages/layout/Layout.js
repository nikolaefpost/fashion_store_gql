import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from "../../componets/nav/nav";
import Footer from "../../componets/footer/Footer";

import style from "./layout.module.scss"
import {useQuery} from "@apollo/client";
import {categoryItemsVar, productChangeItemsVar, productItemsVar} from "../../appolo/cashe/productVar";
import {GET_CATEGORY, GET_PRODUCTS} from "../../appolo/operations/poducts/productQuery";
import {setMinMaxPrice} from "../../appolo/operations/poducts/productMutations";

const Layout = () => {
    const { loading: loadCategory, error: errorCategory , data: category  } = useQuery(GET_CATEGORY);
    categoryItemsVar(category?.queryCategory);

    const { loading: loadProduct, error: errorProduct , data: product  } = useQuery(GET_PRODUCTS);
    productItemsVar(product?.queryProduct)
    productChangeItemsVar(product?.queryProduct);

    setMinMaxPrice();

    return (
            <div className={style.outlet}>
                <Nav/>
                <div className={style.content}>
                    {loadCategory && <h2>Loading ...</h2>}
                    {errorCategory && <h2>Error! {errorCategory.message}</h2>}
                    <Outlet/>
                </div>
                <Footer/>
            </div>
    );
};

export default Layout;