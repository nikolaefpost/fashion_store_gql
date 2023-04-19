import React, {useEffect, useState} from 'react';
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import {AiOutlineRight} from "react-icons/ai";
import rootStore from "../../store/rootStore";
import HistoryOrders from "./HistoryOrders";
import AllData from "./AllData";
import {signOut} from "firebase/auth"

import styles from "./personalArea.module.scss";
import {auth} from "../../firebase";
import {deleteUser, getUserDgraph} from "../../appolo/operations/user/userStore";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_USER} from "../../appolo/operations/user/userGrapfQgl";

const PersonalArea = () => {
    // const [getUser, { data, loading, error}] = useLazyQuery(GET_USER);
    // getUserDgraph(getUser)

    const { orderStore, userStore } = rootStore;
    const [personal, setPersonal] = useState(false);
    const navigate = useNavigate();
    const handleExit = () => {
        // signOut(auth).catch(e=>console.log(e))
        deleteUser();
        navigate("/");
    }
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error?.message}`;

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    return (
        <div className={styles.personal}>
            <div className={styles.nav_block}>
                <span onClick={()=>navigate("/")}>Главная</span>
                <AiOutlineRight/>
                <span>Личный кабинет</span>
            </div>
            <div className={styles.personal_nav}>
                <button
                    className={cn(styles.personal_element, {[styles.active]: !personal})}
                    onClick={()=>setPersonal(false)}
                >История заказов</button>
                <button
                    className={cn(styles.personal_element, {[styles.active]: personal})}
                    onClick={()=>setPersonal(true)}
                >Личные данные</button>
                <button className={styles.personal_element} onClick={handleExit}>Выйти</button>
            </div>
            {!personal ?
                <HistoryOrders purchases={orderStore.purchase}/> :
                <AllData
                    formPersonalInfo={userStore.formPersonalInfo}
                    formDeliveryAddress={userStore.formDeliveryAddress}
                    // handleSetUser={userStore.handleSetUser}
                />}
        </div>
    );
};

export default PersonalArea;