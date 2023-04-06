import React from 'react';

import styles from "../../pages/catalog/catalog.module.scss";



const ProductListCard = ({data, handleTransition, style}) => {
    return (
        <div
            style={style}
            onClick={()=>handleTransition(data.id)}
        >
            <img className={styles.card_img} src={data.image} alt={data.title}/>
            <div className={styles.card_text}>
                <span className={styles.card_title}>{data.title}</span>
                <span className={styles.card_price}>{data.price} грн</span>
                <span className={styles.card_size}>XXS XS S M L</span>
                <div className={styles.card_color}>
                    <div className={styles.white}/>
                    <div className={styles.grey}/>
                    <div className={styles.beige}/>
                </div>
            </div>
        </div>
    );
};

export default ProductListCard;