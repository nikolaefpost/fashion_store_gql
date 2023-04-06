import React from 'react';
import {new1, new2, new3} from "../../assets/img"
import rootStore from "../../store/rootStore";
import {observer} from "mobx-react-lite";
import HomeSlider from "./HomeSlider";
import SubscriptForm from "./SubscriptForm";

import styles from "./home.module.scss";
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS} from "../../appolo/gql/query";

const news = [new1, new2, new3];

const Home = () => {
    const { productStore } = rootStore;
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    productStore.queryProduct(data)
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
                <h2>Категории</h2>
                <HomeSlider data={productStore.category} />
            </div>
            <div className={styles.subscription}>
                <h2>Узнайте  первым о новинках</h2>
                <SubscriptForm/>
            </div>

        </div>
    );
};

export default observer(Home);