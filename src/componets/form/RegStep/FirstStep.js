import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";

import styles from "../form.module.scss";
import AuthProvider from "../../auth/Auth";
import GoogleAuth from "../GoogleAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {ADD_USER} from "../../../appolo/operations/user/userGrapfQgl";
import {useMutation, useReactiveVar} from "@apollo/client";
import {authErrorVar, currentUserVar, isAuthUserVar} from "../../../appolo/cashe/productVar";
import {createUserFireBase, deleteUser} from "../../../appolo/operations/user/userStore";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Неверный адрес электронной почты")
            .required("Адрес электронной почты не введен"),
        password: yup
            .string()
            .required("Пароль не введен")
            .min(8, "Пароль должен содержать минимум 8 символов"),
    })
    .required(
        "Поля не заполнены или введены неверно. Исправьте или введите заново, пожалуйста.",
    );

const FirstStep = ({setUser, form, handleTransition}) => {

    const currentUser = useReactiveVar(currentUserVar);
    const errorMessage = useReactiveVar(authErrorVar);
    console.log(errorMessage)
    const [addUser, { data, loading, error }] = useMutation(ADD_USER);


    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        // values: userStore.user,
        shouldFocusError: true,

    });


    const onSubmit = handleSubmit(data => {
        createUserFireBase(data.email, data.password, addUser);
        // setUser(data)
    });
    
    // const zeroError = () => {
    //     console.log("EEE")
    // }



    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (<>
        <form onSubmit={onSubmit} className={styles.user_form} >
            <h3>Registration</h3>
            {form.map(item => <InputForm
                key={item.field}
                register={register}
                errors={errors}
                field={item.field}
                name={item.name}
                inputType={item.type}
            />)}
            <div className={styles.help_block}>
                <button className={styles.help_button} onClick={handleTransition}>Have an account, login</button>
            </div>
            {errorMessage !== "" && <div className={styles.error}>{errorMessage}</div>}
            <button type="submit" className={styles.submit}>Продолжить</button>

        </form>
            <div className={styles.other_auth}>
                <h5>Registration as user</h5>
                <GoogleAuth/>
            </div>

        </>
    );
};

export default FirstStep;