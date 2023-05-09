import React from 'react';
import {new1, new2, new3} from "../../assets/img"
import {observer} from "mobx-react-lite";
import HomeSlider from "./HomeSlider";
import {useLanguage} from "../../context/setting";
import SubscriptBlock from "../../componets/SubscriptBlock/subscriptBlock";

import styles from "./home.module.scss";



const news = [new1, new2, new3];

const Home = () => {
    const {text} = useLanguage();
    return (
        <div className={styles.content}>
            <div className={styles.new_block}>
                {news.map(item=>(
                    <div key={item} className={styles.img_block}>
                        <div className={styles.gradient}/>
                        <img src={item} alt="news"/>
                    </div>
                ))}
            </div>
            <div className={styles.category}>
                <h2>{text.categories}</h2>
                <HomeSlider />
            </div>
            <SubscriptBlock/>
        </div>
    );
};

export default observer(Home);