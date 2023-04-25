import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from "../../componets/nav/nav";
import Footer from "../../componets/footer/Footer";
import {useQuery} from "@apollo/client";
import {categoryItemsVar, productChangeItemsVar, productItemsVar} from "../../appolo/cashe/appVar";
import {GET_CATEGORY, GET_PRODUCTS} from "../../appolo/operations/poducts/productGrapfQgl";
import {setMinMaxPrice} from "../../appolo/operations/poducts/productStore";

import style from "./layout.module.scss"

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
                    {(loadCategory || loadProduct) && <h2>Loading ...</h2>}
                    {(errorCategory || errorProduct) && <h2>Error! {errorCategory.message}</h2>}
                    <Outlet/>
                </div>
                <Footer/>
            </div>
    );
};

export default Layout;