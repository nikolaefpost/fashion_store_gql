import React, {useEffect, useState} from 'react';
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import HistoryOrders from "./HistoryOrders";
import AllData from "./AllData";
import {deleteUser } from "../../appolo/operations/user/userStore";
import { useQuery } from "@apollo/client";
import { GET_USER_LOCAL } from "../../appolo/operations/user/userGrapfQgl";
import {formDeliveryAddress, formPersonalInfo} from "../../appolo/operations/user/userFormData";
import {useLanguage} from "../../context/setting";
import NavBlock from "../../componets/navBlock/NavBlock";

import styles from "./personalArea.module.scss";



const PersonalArea = () => {
    const {text} = useLanguage();
    const [purchases, setPurchases] = useState([])
    const {data: user, loading, error} = useQuery(GET_USER_LOCAL);

    const [personal, setPersonal] = useState(false);
    const navigate = useNavigate();
    const handleExit = () => {
        deleteUser();
        navigate("/");
    }


    useEffect(()=>{
        console.log(user)
        if (user?.currentUser) setPurchases(user.currentUser.purchases)
    },[user])

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error?.message}`;

    return (
        <div className={styles.personal}>
            <NavBlock
                namePage={text.personal_area}
            />
            <div className={styles.personal_nav}>
                <button
                    className={cn(styles.personal_element, {[styles.active]: !personal})}
                    onClick={()=>setPersonal(false)}
                >{text.history_orders}</button>
                <button
                    className={cn(styles.personal_element, {[styles.active]: personal})}
                    onClick={()=>setPersonal(true)}
                >{text.personal_data}</button>
                <button className={styles.personal_element} onClick={handleExit}>{text.out}</button>
            </div>
            {!personal ?
                <HistoryOrders purchases={purchases}/> :
                <AllData
                    formPersonalInfo={formPersonalInfo}
                    formDeliveryAddress={formDeliveryAddress}
                />}
        </div>
    );
};

export default PersonalArea;