import React, {useEffect, useState} from 'react';
import { AiOutlineHeart} from "react-icons/ai";
import {product1, product2, product3, product4} from "../../assets/img";
import Description from "./Description";
import SelectSize from "./productCardElements/SelectSize";
import SelectColor from "./productCardElements/SelectColor";

import styles from "./productCard.module.scss";


const ProductCard = ({product, setProduct, cardId}) => {
    const productImg = [product?.image, product1, product2, product3, product4];
    const [openSelect, setOpenSelect] = useState(false);
    const [sizeProduct, setSizeProduct] = useState("Выберите размер");
    const [sizeError, setSizeError] = useState(false);

    const [colorProduct, setColorProduct] = useState({id: "white", name: "Белый снег"});

    const [currentImg, setCurrentImg] = useState("");



    useEffect(() => {
        setCurrentImg(product?.image)
    }, [product])

    useEffect(()=>{
        setSizeProduct("Выберите размер")
    },[cardId])

    const setOrder = (id) => {
        if (sizeProduct === "Выберите размер") {
            setSizeError(true);
            return;
        }
        setProduct({id: id, size: sizeProduct, color: colorProduct.id, quantity: 1})
    }

    return (
        <div className={styles.content}>
            <div className={styles.product_card}>
                <div className={styles.img_block}>
                    <div className={styles.list_img}>
                        <div className={styles.shift_block}>
                            {productImg.map((src, i) => (
                                <img key={i} src={src} alt="product" onClick={() => setCurrentImg(src)}/>
                            ))}
                        </div>
                    </div>
                    <div className={styles.main_img}>
                        <img src={currentImg} alt="product"/>
                    </div>
                </div>
                <div className={styles.text_block}>
                    <h3>{product?.title}</h3>
                    <div className={styles.price}>{product?.price} грн.</div>
                    <SelectColor colorProduct={colorProduct} setColorProduct={setColorProduct} />
                    <SelectSize
                        openSelect={openSelect}
                        setOpenSelect={setOpenSelect}
                        sizeProduct={sizeProduct}
                        setSizeProduct={setSizeProduct}
                        sizeError={sizeError}
                        setSizeError={setSizeError}
                    />
                    <div className={styles.button_block}>
                        <button onClick={()=>setOrder(product?.id)}>В КОРЗИНУ</button>
                        <button><AiOutlineHeart/>В ИЗБРАННОЕ</button>
                    </div>
                    <div className={styles.description}>
                        <h4>Подробности</h4>
                        <Description title="Обмеры и описание">{product?.description}</Description>
                        <Description title="Состав и уход">
                            <ul>
                                <li>Состав: 50% Шерсть, 50% Полиэстер</li>
                                <li>Подкладка: 100% Полиэстер</li>
                                <li>Утеплитель: 90% Пух, 10% Перо</li>
                            </ul>
                            <ul>
                                <li>- Не стирать</li>
                                <li>- Гладить при температуре утюга до 110°C</li>
                                <li>- Не отбеливать</li>
                                <li>- Барабанная сушка запрещена</li>
                                <li>- Сухая чистка (химчистка)</li>
                            </ul>
                        </Description>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;