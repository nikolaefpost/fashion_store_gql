import React from 'react';
import MobileHeaderCatalog from "./mobile/MobileHeaderCatalog";
import DesktopHeaderCatalog from "./desktop/DesktopHeaderCatalog";
import {useReactiveVar} from "@apollo/client";
import {
    productChangePriseRange,
    productCurrentColorVar,
    productCurrentSizeVar,
    productInputMinMax, productSortingOption
} from "../../appolo/cashe/appVar";

const Header = ({length, isMobile}) => {
    const currentSize = useReactiveVar(productCurrentSizeVar);
    const currentColor = useReactiveVar(productCurrentColorVar);
    const changePriseRange = useReactiveVar(productChangePriseRange);
    const inputMinMax = useReactiveVar(productInputMinMax);
    const sortingOption = useReactiveVar(productSortingOption);
    return isMobile?
        <MobileHeaderCatalog
            length={length}
            currentSize={currentSize}
            currentColor={currentColor}
            changePriseRange={changePriseRange}
            inputMinMax={inputMinMax}
            sortingOption={sortingOption}
    />:<DesktopHeaderCatalog
            length={length}
            currentSize={currentSize}
            currentColor={currentColor}
            changePriseRange={changePriseRange}
            inputMinMax={inputMinMax}
            sortingOption={sortingOption}
        />

};

export default Header;