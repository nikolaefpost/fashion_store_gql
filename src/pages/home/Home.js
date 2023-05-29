import React from 'react';
import {new1, new2, new3} from "../../assets/img"
import HomeSlider from "./HomeSlider";
import {useLanguage} from "../../context/setting";
import SubscriptBlock from "../../componets/SubscriptBlock/subscriptBlock";

import styles from "./home.module.scss";
import {useMediaQuery} from "../../helpers/useMediaQuery";



const Home = () => {

    const isMobile = useMediaQuery(500);
    const height = window.innerHeight

    const news  = isMobile? [new1] :  [new1, new2, new3];
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
                <h2>{text.categories}{height}</h2>
                <HomeSlider />
            </div>
            <SubscriptBlock/>
        </div>
    );
};

export default Home;