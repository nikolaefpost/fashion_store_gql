import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";
import {authCreateUserDgraph, authCreateUserFireBase, setUserLocal} from "../../../appolo/operations/user/userStore";
import {useLazyQuery, useMutation, useReactiveVar} from "@apollo/client";
import {ADD_USER, AUTH_USER} from "../../../appolo/operations/user/userGrapfQgl";
import {authErrorVar, userDataVar, userMailVar} from "../../../appolo/cashe/appVar";

import styles from "../form.module.scss";
import GoogleAuth from "../GoogleAuth";
import {useLanguage} from "../../../context/setting";

// const schema = yup
//     .object({
//         email: yup
//             .string()
//             .email("Неверный адрес электронной почты")
//             .required("Адрес электронной почты не введен"),
//         password: yup
//             .string()
//             .required("Пароль не введен")
//             .min(8, "Пароль должен содержать минимум 8 символов"),
//     })
//     .required(
//         "Поля не заполнены или введены неверно. Исправьте или введите заново, пожалуйста.",
//     );

const MainAuth = ({handleTransition, form, setModal, setIsNewPassword}) => {
    const { text, lang } = useLanguage();
    const schema = yup
        .object({
            email: yup
                .string()
                .email(text.incorrect_email)
                .required(text.not_entered_email),
            password: yup
                .string()
                .required(text.password_not_entered)
                .min(8, text.password_must_contain),
        })
        .required(text.all_error_fields);
    const [authUser, {data: checkUser, loading: loadingCheck, error: errorCheck}] = useLazyQuery(AUTH_USER);
    const [addUser, {data: createUser, loading: loadingUser, error: errorUser}] = useMutation(ADD_USER);
    const errorMessage = useReactiveVar(authErrorVar);
    const currentUser = userDataVar()

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: currentUser?.email? currentUser: {email: userMailVar()},
        shouldFocusError: true,

    });
    console.log(currentUser)

    const onSubmit = handleSubmit(data => {
        authCreateUserFireBase(data.email, data.password, authUser)
    });


    useEffect(() => {
        if (!checkUser) return;
        if (checkUser.checkUserPassword) {
            setUserLocal()
            setModal(false);
        } else {
            authCreateUserDgraph(addUser)
        }
    }, [checkUser])

    useEffect(() => {
        if (createUser?.addUser) {
            setUserLocal()
            setModal(false);
        }
    }, [createUser])

    if (loadingCheck || loadingUser) return 'Submitting...';
    if (errorCheck || errorUser) return `Submission error! ${errorUser?.message} ${errorCheck?.message}`;
    return (<>
            <form
                onSubmit={onSubmit}
                className={styles.user_form}
            >
                <h3>{text.authorization}</h3>
                {form.map(item => <InputForm
                    key={item.field}
                    register={register}
                    errors={errors}
                    field={item.field}
                    name={lang === "Eng"? item.name: item.name_ua}
                    inputType={item.type}
                />)}
                <div className={styles.help_block}>
                    <button
                        className={styles.help_button}
                        onClick={() => setIsNewPassword(true)}
                    >{text.forgot_your_password}?
                    </button>
                    <button
                        className={styles.help_button}
                        onClick={handleTransition}
                    >{text.not_account}?
                    </button>
                </div>
                {errorMessage !== "" && <div className={styles.error}>{errorMessage}</div>}
                <button type="submit" className={styles.submit}>{text.enter}</button>
            </form>
            <GoogleAuth setModal={setModal}/>
        </>
    );
};

export default MainAuth;