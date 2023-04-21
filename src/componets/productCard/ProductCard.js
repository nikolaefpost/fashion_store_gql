import React, {useEffect, useState} from 'react';
import { AiOutlineHeart} from "react-icons/ai";
import Description from "./Description";
import SelectSize from "./productCardElements/SelectSize";
import SelectColor from "./productCardElements/SelectColor";

import styles from "./productCard.module.scss";


const ProductCard = ({product, setProduct, cardId}) => {
    const [openSelect, setOpenSelect] = useState(false);
    const [sizeProduct, setSizeProduct] = useState("Выберите размер");
    const [sizeError, setSizeError] = useState(false);

    const [colorProduct, setColorProduct] = useState({});

    const [currentImg, setCurrentImg] = useState("");

    useEffect(()=>{
        if (product?.image_src?.length) {
            setCurrentImg(product?.image_src[0])
        }

        if (product?.color) setColorProduct(product?.color[0])
    },[product])


    useEffect(()=>{
        setSizeProduct("Choose a size")
    },[cardId])

    const setOrder = (id) => {
        if (sizeProduct === "Choose a size") {
            setSizeError(true);
            return;
        }
        setProduct({product: {id}, size: sizeProduct, color: colorProduct.id, quantity: 1})
    }

    return (
        <div className={styles.content}>
            <div className={styles.product_card}>
                <div className={styles.img_block}>
                    <div className={styles.list_img}>
                        <div className={styles.shift_block}>
                            {product?.image_src?.map((src) => (
                                <img key={src} src={`/assets/image/${src}`} alt="product" onClick={() => setCurrentImg(src)}/>
                            ))}
                        </div>
                    </div>
                    <div className={styles.main_img}>
                        {currentImg && <img src={`/assets/image/${currentImg}`} alt="product"/>}
                    </div>
                </div>
                <div className={styles.text_block}>
                    <h3>{product?.name}</h3>
                    <div className={styles.price}>{product?.price} gr.</div>
                    <SelectColor colorProduct={colorProduct} setColorProduct={setColorProduct} color={product?.color}  />
                    <SelectSize
                        openSelect={openSelect}
                        setOpenSelect={setOpenSelect}
                        sizeProduct={sizeProduct}
                        setSizeProduct={setSizeProduct}
                        sizeError={sizeError}
                        setSizeError={setSizeError}
                        size={product?.size}
                    />
                    <div className={styles.button_block}>
                        <button onClick={()=>setOrder(product?.id)}>ADD TO CART</button>
                        <button><AiOutlineHeart/>TO FAVORITES</button>
                    </div>
                    <div className={styles.description}>
                        <h4>Details</h4>
                        <Description title="About">{product?.description_details}</Description>
                        <Description title="Measurements and description">
                            {product?.description_composition && <ul>
                                {product?.description_composition.map(item => <li key={item}>{item}</li>)}
                            </ul>}
                        </Description>
                        <Description title="Composition and care">
                            {product?.description_care && <ul>
                                {product?.description_care.map(item => <li key={item}>- {item}</li>)}
                            </ul>}
                        </Description>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;