import React from 'react';
import { Link } from "react-router-dom";
import {insta, telegram} from "../../assets/icon";

import styles from "./footer.module.scss"
import {useLanguage} from "../../context/setting";

const Footer = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <h3>КОМПАНИЯ</h3>
                <Link to="">О нас</Link>
                <Link to="">Контакты</Link>
            </div>
            <div className={styles.block}>
                <h3>ПОЛЕЗНОЕ</h3>
                <Link to="">Оплата и доставка</Link>
                <Link to="/exchange">{text.exchange_and_return}</Link>
                <Link to="">Бонусная система</Link>
            </div>
            <div className={styles.block}>
                <h3>ПОКУПАТЕЛЮ</h3>
                <Link to="">Избранное</Link>
                <Link to="">Публичная оферта</Link>
                <Link to="">Политика конфиденциальности</Link>
            </div>
            <div className={styles.block}>
                <h3>КОНТАКТЫ</h3>
                <div className={styles.social}>
                    <img alt="instagram" src={insta}/>
                    <img alt="telegram" src={telegram}/>
                </div>
                <span>+38(093) 123 45 67</span>
                <span>info@defile.com</span>
            </div>
        </div>
    );
};

export default Footer;