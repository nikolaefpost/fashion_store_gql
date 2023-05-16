import React, {useEffect, useState} from 'react';
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_USER} from "../../../appolo/operations/user/userGrapfQgl";
import {getUserLocal} from "../../../appolo/operations/user/userStore";
import {currentUserVar, isAuthUserVar} from "../../../appolo/cashe/appVar";
import {Link} from "react-router-dom";
import {MdOutlineAccountBalanceWallet} from "react-icons/md";
import {UserIcon} from "../../../assets/icon";
import Modal from "../../modal/Modal";
import Form from "../../form/Form";
import {useLanguage} from "../../../context/setting";

import styles from "./navMobile.module.scss";

const UserIdentificationMobil = ({closeMenu}) => {
    const { text } = useLanguage();
    const { data } = useQuery(GET_USER,{
        variables: {
            email: getUserLocal(),
            pollInterval: 500,
        }
    });

    const isAuth = useReactiveVar(isAuthUserVar)
    const [modal, setModal] = useState(false)

    const closeModal = (e) => {
        e.stopPropagation();
        setModal(false)
    }
    const openModal = () => setModal(true)

    useEffect(()=>{
        currentUserVar(data?.getUser)
    },[data])
    return (
        <div className={styles.item_menu} onClick={closeMenu}>
            {isAuth ?
                <Link to="personal" >
                    <MdOutlineAccountBalanceWallet/>
                    {text.personal_area}
                </Link> :
                <div onClick={openModal}>
                    <UserIcon color="#E0BEA2"/>
                    {text.log_in_up}
                </div>
                }
            {modal && <Modal fn={closeModal}>
                <Form setModal={setModal} />
            </Modal>}
        </div>
    );
};

export default UserIdentificationMobil;