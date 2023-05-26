import React, {useEffect} from 'react';
import {FcGoogle} from "react-icons/fc"
import {useLazyQuery, useMutation} from "@apollo/client";
import {ADD_USER, AUTH_USER} from "../../appolo/operations/user/userGrapfQgl";
import {googleAuthUser, setUserLocal} from "../../appolo/operations/user/userStore";
import {userDataVar} from "../../appolo/cashe/appVar";
import {useLanguage} from "../../context/setting";

import styles from "./form.module.scss"


const GoogleAuth = ({setModal}) => {
    const { text } = useLanguage();
    const [authUser, { data: checkUser, loading: loadingCheck, error: errorCheck }] = useLazyQuery(AUTH_USER);
    const [addUser, { loading, error }] = useMutation(ADD_USER)
    const handleGoogleAuth = () => {
        googleAuthUser(authUser)
    }

    useEffect(()=>{
        console.log(checkUser)
        if (!checkUser) return
        if (!checkUser.checkUserPassword) {
            const {email, token} = userDataVar();
            addUser({variables: {email, token}})
                .then(()=>{
                    setUserLocal()
                    setModal(false);
                })
                .catch(e=>console.log(e))
        }else {
            setUserLocal()
            setModal(false);
        }
    },[checkUser])

    if (loading || loadingCheck) return 'Submitting...';
    if (error || errorCheck) return `Submission error! ${error?.message}`;

    return (
        <div className={styles.other_auth}>
            <h5>{text.enter_as_user}</h5>
            <button className={styles.google_button} onClick={handleGoogleAuth}><FcGoogle/>  Google </button>
        </div>

    );
};

export default GoogleAuth;