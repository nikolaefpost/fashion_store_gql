import React  from 'react';
import cn from "classnames";
import {RiDeleteBinLine} from "react-icons/ri"
import {AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import {decQuantityItem, deleteProduct, incQuantityItem} from "../../appolo/operations/order/orderStore";
import {useLanguage} from "../../context/setting";
import {useMediaQuery} from "../../hooks/useMediaQuery";

import styles from "./order.module.scss";

const OrderCard = ({orderElement, currentProduct}) => {
    const isMobile = useMediaQuery(500);
    const {text, lang} = useLanguage();
   const decQuantity = () => {
     if(orderElement.quantity>1)  decQuantityItem(orderElement.id)
   }

    const incQuantity = () => {
        incQuantityItem(orderElement.id)
    }

    const handleDeleteOrderElement = () => {
        deleteProduct(orderElement.id)
    }
    return (currentProduct?.id?
        <div  className={styles.list_item}>
            <div className={styles.title_block}>
                <div className={styles.image}>
                    <img  src={`/assets/image/${currentProduct?.image_src[0]}`} alt="product image" />
                </div>
                <div className={styles.title}>
                    <p>{lang === "Eng" ? currentProduct.name: currentProduct.name_ua}</p>
                    <span>art {parseInt(currentProduct.id)}</span>
                    {/*<span>{window.screen.width}, {window.screen.height}</span>*/}

                </div>
            </div>
            <div className={styles.color_block}>
                <div className={cn(styles.color_el, styles[orderElement.color])}/>
            </div>
            <div className={styles.size_block}>{!isMobile && text.size} {orderElement.size}</div>
            <div className={styles.quantity_block}>
                <span className={styles.sign} onClick={decQuantity}><AiOutlineMinus/></span>
                {orderElement.quantity}
                <span className={styles.sign} onClick={incQuantity}><AiOutlinePlus/></span>
            </div>
            <div className={styles.price_block}>
                <div className={styles.price}>{currentProduct.price} {text.currency}</div>
                <span className={styles.delete} onClick={handleDeleteOrderElement}><RiDeleteBinLine/></span>
            </div>
        </div>:
            <div>Loading...</div>
    );
};

export default OrderCard;