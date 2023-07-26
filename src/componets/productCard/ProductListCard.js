import React, {useEffect, useState} from 'react';
import {RiDeleteBinLine} from "react-icons/ri"
import {useLanguage} from "../../context/setting";
import {heartOutline} from "../../assets/icon";
import {getUserLocal} from "../../appolo/operations/user/userStore";
import {useMutation} from "@apollo/client";
import {DELETE_FAVORITES, UPDATE_FAVORITES} from "../../appolo/operations/user/userGrapfQgl";

import styles from "../../pages/catalog/catalog.module.scss";



const ProductListCard = ({data, handleTransition, style, isFavorite}) => {
    const [favoriteMess, setFavoriteMess] = useState('');
    const {lang, text} = useLanguage();
    const [updateUser, { data: updateData }] = useMutation(UPDATE_FAVORITES);
    const [deleteUser, { data: deleteData }] = useMutation(DELETE_FAVORITES);
    const user = getUserLocal()

    const handleAddFavorites = () => {
        if (user) {
            updateUser({
                variables: {
                    favorites: [{id: data.id}],
                    email: {eq: user.email}
                }
            })
        }else {
            setFavoriteMess(text.to_add_favorites)
            setTimeout(()=>setFavoriteMess(''), 2000)
        }

    }

    const handleDeleteFavorites = () => {
        if (user) {
            deleteUser({
                variables: {
                    favorites: [{id: data.id}],
                    email: {eq: user.email}
                }
            })
        }
    }

    useEffect(()=>{
        if (deleteData?.updateUser) {
            location.reload()
        }
    },[deleteData])

    useEffect(()=>{
        if (updateData?.updateUser) {
            location.reload()
        }
    },[updateData])
    return (data &&
        <div
            style={style}
            // onClick={() => handleTransition(data.id)}
            className={styles.product_card}
        >
            {favoriteMess.length > 0 && <div className={styles.favorite_mess}>{favoriteMess}</div>}
            <div className={styles.add_favorite} onClick={!isFavorite? handleAddFavorites : handleDeleteFavorites}>
                {!isFavorite ? <img src={heartOutline} alt='heart'/>:
                    <RiDeleteBinLine/>}
            </div>
            <img
                onClick={() => handleTransition(data.id)}
                className={styles.card_img}
                src={`/assets/image/${data.image_src[0]}`}
                alt={data.title}
            />
            <div className={styles.card_text} onClick={() => handleTransition(data.id)}>
                <span className={styles.card_title}>{lang === "Eng" ? data.name : data.name_ua}</span>
                <span className={styles.card_price}>{data.price} {text.currency}</span>
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