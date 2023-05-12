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

import styles from "../navMobile.module.scss";

const UserIdentificationMobil = () => {
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
        <div className={styles.item_menu}>
            {isAuth ?
                <>
                    <Link to="personal"  ><MdOutlineAccountBalanceWallet/></Link>
                    {text.personal_area}
                </> :
                <>
                    <UserIcon color="#E0BEA2" openModal={openModal}/>
                    {text.log_in_up}
                </>
                }
            {modal && <Modal fn={closeModal}>
                <Form setModal={setModal} />
            </Modal>}
        </div>
    );
};

export default UserIdentificationMobil;