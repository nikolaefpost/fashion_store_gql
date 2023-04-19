import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";

import styles from "../form.module.scss";
import {
    authUserFireBase,
    deleteUser,
    sendEmailVerificationFireBase,
    setUserLocal
} from "../../../appolo/operations/user/userStore";
import {useMutation, useReactiveVar} from "@apollo/client";
import {ADD_USER} from "../../../appolo/operations/user/userGrapfQgl";
import {
    currentUserVar,
    isAuthUserVar,
    secondStepVar, userDataVar,
    userEmailVar,
    userPasswordVar
} from "../../../appolo/cashe/productVar";

// const schema = yup
//     .object({
//         code: yup
//             .string()
//             .required("Код не введен")
//     })

const SecondStep = ({ setModal}) => {
    const [addUser, { data, loading, error }] = useMutation(ADD_USER)
    const currentData = useReactiveVar(userDataVar)
    const { email } = userDataVar();

    const createUserFinality = () => {
        authUserFireBase(addUser)
    }

    useEffect(()=>{
        console.log(currentData)
        if (currentData.email) {
            sendEmailVerificationFireBase()
        }
    },[currentData])

    useEffect(()=>{
       if (data?.addUser) {
           setUserLocal()
           setModal(false);
       }
    },[data])

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error?.message}`;

    return (
        <div  className={styles.user_form}>
            <h3>Регистрация - шаг 2</h3>
           <div>
               Received a letter in the mailbox {email}. Follow the link provided to confirm your email.
               Then proceed with registration.
           </div>
            <button
                type="button"
                className={styles.submit}
                onClick={createUserFinality}
            >ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </div>
    );
};

export default SecondStep;