import React, {useEffect, useState} from 'react';
import {AiOutlineHeart} from "react-icons/ai";
import Description from "./Description";
import SelectSize from "./productCardElements/SelectSize";
import SelectColor from "./productCardElements/SelectColor";
import {useLanguage} from "../../context/setting";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER_LOCAL, UPDATE_FAVORITES} from "../../appolo/operations/user/userGrapfQgl";
import {motion, AnimatePresence} from "framer-motion";
import styles from "./productCard.module.scss";
import cn from "classnames";


const ProductCard = ({product, setProduct, cardId, isTablet, isMobile, lessTablet}) => {
    const [addProduct, setAddProduct] = useState(true)
    const {text, lang} = useLanguage();
    const {data: user} = useQuery(GET_USER_LOCAL);

    const [updateUser, {data: updateData}] = useMutation(UPDATE_FAVORITES);
    const [openSelect, setOpenSelect] = useState(false);
    const [sizeProduct, setSizeProduct] = useState();
    const [sizeError, setSizeError] = useState(false);
    const date = new Date();

    const [colorProduct, setColorProduct] = useState({});

    const [currentImg, setCurrentImg] = useState("");

    const moves = !isMobile ? {
            animate: {opacity: 0, top: '50%', left: '55%'},
            exit: {opacity: 1, top: '-20%', left: '95%'}
        } :
        {
            animate: {opacity: 0, top: '70%', left: '25%'},
            exit: {opacity: 1, top: '-10%', left: '95%'}
        }


    const handleAddFavorites = () => {
        // updateUser({
        //     variables: {
        //         favorites: [{id: product.id}],
        //         email: {eq: user.currentUser.email}
        //     }
        // })
        if (user) {
            updateUser({
                variables: {
                    favorites: [{id: product.id}],
                    email: {eq: user.currentUser.email}
                }
            })
        }
    }

    useEffect(() => {
        if (product?.image_src?.length) {
            setCurrentImg(product?.image_src[0])
        }
        if (product?.color) setColorProduct(product?.color[0])
    }, [product])


    useEffect(() => {
        setSizeProduct(text.select_size)
    }, [cardId, text])

    const setOrder = (id) => {
        if (sizeProduct === text.select_size) {
            setSizeError(true);
            return;
        }
        setProduct({product: {id}, size: sizeProduct, color: colorProduct.id, quantity: 1, id: +date.getTime()})
        setAddProduct(false)
        setTimeout(() => setAddProduct(true), 1000)
    }

    useEffect(() => {
        setAddProduct(true);
    }, [cardId])

    useEffect(()=>{
        if (updateData?.updateUser) {
            location.reload()
        }
    },[updateData])

    const descriptionComposition = lang === "Eng" ? product?.description_composition : product?.description_composition_ua
    const descriptionCare = lang === "Eng" ? product?.description_care : product?.description_care_ua

    return (
        <div className={styles.content}>
            <AnimatePresence>
                {addProduct && <motion.div
                    initial={{opacity: 0}}
                    animate={moves.animate}
                    exit={moves.exit}
                    className={styles.move_object}
                />}
            </AnimatePresence>
            <div className={styles.product_card}>
                <div className={styles.img_block}>
                    <div className={styles.list_img}>
                        <div className={styles.shift_block}>
                            {product?.image_src?.map((src) => (
                                <img key={src} src={`/assets/image/${src}`} alt="product"
                                     onClick={() => setCurrentImg(src)}/>
                            ))}
                        </div>
                    </div>
                    <div className={styles.main_img}>
                        {currentImg && <img src={`/assets/image/${currentImg}`} alt="product"/>}
                    </div>
                </div>
                <div className={styles.text_block}>
                    <h3>{lang === "Eng" ? product?.name : product?.name_ua}</h3>
                    <div className={styles.price}>{product?.price} {text.currency}.</div>
                    <SelectColor colorProduct={colorProduct} setColorProduct={setColorProduct} color={product?.color}/>
                    {}
                    <SelectSize
                        openSelect={openSelect}
                        setOpenSelect={setOpenSelect}
                        sizeProduct={sizeProduct}
                        setSizeProduct={setSizeProduct}
                        sizeError={sizeError}
                        setSizeError={setSizeError}
                        size={product?.size}
                        lessTablet={lessTablet}
                    />
                    <div className={styles.button_block}>
                        <button onClick={() => setOrder(product?.id)}>{text.add_cart}</button>
                        <button className={cn({[styles.hide_button]: !user})} onClick={handleAddFavorites}><AiOutlineHeart/>{text.to_favorites}</button>
                    </div>
                    {!isTablet && <div className={styles.description}>
                        <h4>{text.details}</h4>
                        <Description title={text.description}>
                                <div>{lang === "Eng" ? product?.description_details : product?.description_details_ua}</div>
                        </Description>
                        <Description title={text.composition}>
                                {descriptionComposition && <ul>
                                    {descriptionComposition.map((item) => <li key={item}>{item}</li>)}
                                </ul>}
                        </Description>
                        <Description title={text.care}>
                            {descriptionCare && <ul>
                                {descriptionCare.map((item) => <li key={item}>- {item}</li>)}
                            </ul>}
                        </Description>
                    </div>}
                </div>
            </div>
            {isTablet && <div className={styles.description}>
                <h4>{text.details}</h4>
                <Description title={text.description}>
                    {lang === "Eng" ? product?.description_details : product?.description_details_ua}
                </Description>
                <Description title={text.composition}>
                    {descriptionComposition && <ul>
                        {descriptionComposition.map(item => <li key={item}>{item}</li>)}
                    </ul>}
                </Description>
                <Description title={text.care}>
                    {descriptionCare && <ul>
                        {descriptionCare.map(item => <li key={item}>- {item}</li>)}
                    </ul>}
                </Description>
            </div>}
        </div>
    );
};

export default ProductCard;