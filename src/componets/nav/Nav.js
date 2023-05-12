import React from 'react';
import {useMediaQuery} from "../../helpers/useMediaQuery";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const Nav = () => {
    const isMobile = useMediaQuery(500);

    return !isMobile? <NavDesktop/>: <NavMobile/>
};

export default Nav;