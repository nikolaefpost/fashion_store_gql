import React from 'react';
import {coat_category, fur_coats, jackets, parkas} from "../../assets/img";
import {useLanguage} from "../../context/setting";
import {useNavigate} from "react-router-dom";
import {filterCategory} from "../../appolo/operations/poducts/productStore";
import PropTypes from "prop-types";

import styles from "./home.module.scss";

const categoryImg = {
    jackets: jackets,
    parkas: parkas,
    ["fur coats"]: fur_coats,
    coat: coat_category
}

const HomeSliderCard = ({card}) => {
    const navigate = useNavigate();

    const {lang} = useLanguage();
    const {category, category_ua} = card
    let title = lang === "Укр"? category_ua : category;

    const handleMoveCategory = () => {
        filterCategory({category, category_ua})
        navigate("card");

    }

    return (
        <div className={styles.element} onClick={handleMoveCategory}>
            <img src={categoryImg[category]} alt="category" />
            <div className={styles.name}>{title}</div>
        </div>
    );
};

HomeSliderCard.propTypes = {
    card: PropTypes.shape({
        category: PropTypes.string,
        category_ua: PropTypes.string,
    })
}

export default HomeSliderCard;