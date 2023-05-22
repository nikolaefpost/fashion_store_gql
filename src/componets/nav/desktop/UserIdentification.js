import React, {useEffect, useState} from 'react';
import {UserIcon} from "../../../assets/icon";
import cn from "classnames";
import {MdOutlineAccountBalanceWallet} from "react-icons/md"
import Modal from "../../modal/Modal";
import Form from "../../form/Form";
import {Link} from "react-router-dom";
import {getUserLocal} from "../../../appolo/operations/user/userStore";
import { useQuery, useReactiveVar} from "@apollo/client";
import {currentUserVar, isAuthUserVar} from "../../../appolo/cashe/appVar";
import {GET_USER} from "../../../appolo/operations/user/userGrapfQgl";

import styles from "./navDesktop.module.scss"

const UserIdentification = ({isHome}) => {
    const { data } = useQuery(GET_USER,{
        variables: {
            email: getUserLocal(),
            pollInterval: 500,
        }
    });

    const isAuth = useReactiveVar(isAuthUserVar)
    // const isRefetch = useReactiveVar(refetchVar)
    const [modal, setModal] = useState(false)

    const closeModal = (e) => {
        e.stopPropagation();
        setModal(false)
    }
    const openModal = () => setModal(true)

    useEffect(()=>{
        currentUserVar(data?.getUser)
        console.log(data)
    },[data])

    // useEffect(()=>{
    //     if (isRefetch === 0) return
    //     console.log(isRefetch)
    //     refetch({ email: getUserLocal() })
    //     // location.reload()
    // },[isRefetch])

    return (
        <div className={styles.user_block}>
            {isAuth ?
                <Link to="personal"  className={cn(styles.account, {[styles.color]: isHome})}><MdOutlineAccountBalanceWallet/></Link>:
                <UserIcon color={isHome ? "#FFFFFF" : "#E0BEA2"} openModal={openModal}/>}
            {modal && <Modal fn={closeModal}>
                <Form setModal={setModal} />
            </Modal>}
        </div>
    );
};

export default UserIdentification;