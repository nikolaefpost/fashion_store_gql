import React, {useState} from 'react';
import {UserIcon} from "../../assets/icon";
import cn from "classnames";
import {MdOutlineAccountBalanceWallet} from "react-icons/md"
import Modal from "../modal/Modal";
import Form from "../form/Form";
import rootStore from "../../store/rootStore";
import {Link} from "react-router-dom";

import styles from "./nav.module.scss"
import {getUserDgraph} from "../../appolo/operations/user/userStore";
import {useReactiveVar} from "@apollo/client";
import {isAuthUserVar} from "../../appolo/cashe/productVar";

const UserIdentification = ({isHome}) => {
    getUserDgraph();
    const isAuth = useReactiveVar(isAuthUserVar)
    console.log(isAuth)
    const {userStore} = rootStore;
    const [modal, setModal] = useState(false)

    const closeModal = (e) => {
        e.stopPropagation();
        setModal(false)
    }
    const openModal = () => setModal(true)

    return (
        <div className={styles.user_block} >
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