import React from 'react';
import ProductListCard from "../../componets/productCard/ProductListCard";

import styles from "../../componets/productCard/productCard.module.scss";

const OtherImage = ({title, handleTransition, style, data, isFavorite}) => {

    return (
        <div className={styles.whole_image}>
            <h3>{title}</h3>
            <div className={styles.whole_image_block} style={{height: style.height}}>
                <div className={styles.shift_block}>
                    {data.map((el, i) => (!el ? <div key={i}>Loading...</div> :
                            <ProductListCard key={el.id} data={el} style={style} handleTransition={handleTransition} isFavorite={isFavorite}/>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default OtherImage;