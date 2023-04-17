import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";

import styles from "../form.module.scss";
import {authUserFireBase, deleteUser, sendEmailVerificationFireBase} from "../../../appolo/operations/user/userStore";
import {useMutation, useReactiveVar} from "@apollo/client";
import {ADD_USER} from "../../../appolo/operations/user/userGrapfQgl";
import {
    currentUserVar,
    isAuthUserVar,
    secondStepVar,
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
    const currentUser = useReactiveVar(currentUserVar)
    console.log("SecondStep-currentUser" ,currentUser)
    const password = useReactiveVar(userPasswordVar)
    const email = useReactiveVar(userEmailVar)


    // const {
    //     register,
    //     formState: {errors},
    //     handleSubmit,
    // } = useForm({
    //     mode: "onTouched",
    //     resolver: yupResolver(schema),
    //     shouldFocusError: true,
    //
    // });

    // const onSubmit = handleSubmit(data => {
    //     if (data.code.length>1) {
    //         //тут проверка кода из почты
    //         setIsCheckEmail(true);
    //         setTimeout(()=>setModal(false),0);
    //     }
    // });

    const createUserFinality = (currentUser) => {
        // const { email } = currentUserVar();
        console.log(email)
        authUserFireBase(email, password, addUser)
    }

    useEffect(()=>{
        if (currentUser.email) {
            console.log("SEND")
            sendEmailVerificationFireBase()
        }
    },[currentUserVar])

    useEffect(()=>{
        console.log(data)
       if (data?.addUser) {
           isAuthUserVar(true)
           setModal(false);
       }
       // else deleteUser();
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
                onClick={()=>createUserFinality(currentUser)}
            >ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </div>
    );
};

export default SecondStep;