import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from "../../componets/nav/nav";
import Footer from "../../componets/footer/Footer";

import style from "./layout.module.scss"

const Layout = () => {

    return (
            <div className={style.outlet}>
                <Nav/>
                <div className={style.content}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
    );
};

export default Layout;