import React from 'react';

import styles from "../../pages/catalog/catalog.module.scss";


const ProductListCard = ({data, handleTransition, style}) => {
    return (data &&
            <div
                style={style}
                onClick={() => handleTransition(data.id)}
            >
                <img className={styles.card_img} src={`/assets/image/${data.image_src[0]}`} alt={data.title}/>
                <div className={styles.card_text}>
                    <span className={styles.card_title}>{data.name}</span>
                    <span className={styles.card_price}>{data.price} грн</span>
                    <span className={styles.card_size}>
                    {data.size.map(el => (<span key={el}>{el} </span>))}
                </span>
                    <div className={styles.card_color}>
                        {data.color.map(el => (<div key={el.id} className={styles[el.id]}/>))}
                    </div>
                </div>
            </div>
    );
};

export default ProductListCard;