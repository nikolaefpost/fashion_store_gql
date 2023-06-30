import React from 'react';
import {useMediaQuery} from "../../hooks/useMediaQuery";
import NavDesktop from "./desktop/NavDesktop";
import NavMobile from "./mobil/NavMobile";

const Nav = () => {
    const isMobile = useMediaQuery(500);

    return !isMobile? <NavDesktop/>: <NavMobile/>
};

export default Nav;