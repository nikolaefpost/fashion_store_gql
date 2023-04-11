import React from 'react';
import {coat_category, fur_coats, jackets, parkas} from "../../assets/img";
import {useLanguage} from "../../context/setting";

import styles from "./home.module.scss";

const categoryImg = {
    jackets: jackets,
    parkas: parkas,
    ["fur coats"]: fur_coats,
    coat: coat_category
}

const HomeSliderCard = ({card}) => {

    const {lang} = useLanguage();
    const {category, category_ua} = card
    let title = lang === "Укр"? category_ua : category;

    return (
        <div className={styles.element}>
            <img src={categoryImg[category]} alt="category" />
            <div className={styles.name}>{title}</div>
        </div>
    );
};

export default HomeSliderCard;