import React, {useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";
import rootStore from "../../../store/rootStore";

import styles from "../form.module.scss";

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

const MainAuth = ({handleTransition, form, authUser, setModal, setIsNewPassword}) => {
    const { userStore } = rootStore;
    const [isNoAuth, setIsNoAuth] = useState({message: "", flag: true});

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: userStore.user,
        shouldFocusError: true,

    });

    const onSubmit = handleSubmit(data => {
        const auth = authUser(data);
        if (auth.flag) setModal(false);
        else setIsNoAuth(auth)
    });
    return (
        <form
            onSubmit={onSubmit}
            className={styles.user_form}
            onClick={()=>setIsNoAuth({message: "", flag: true})}
        >
            <h3>Авторизация</h3>
            {form.map(item => <InputForm
                key={item.field}
                register={register}
                errors={errors}
                field={item.field}
                name={item.name}
                inputType={item.type}
            />)}
            <div className={styles.help_block}>
                <button
                    className={styles.help_button}
                    onClick={()=>setIsNewPassword(true)}
                >Забыли пароль?</button>
                <button
                    className={styles.help_button}
                    onClick={handleTransition}
                >Нет аккаунта?</button>
            </div>
            {!isNoAuth.flag && <div className={styles.error}>{isNoAuth.message}</div>}
            <button  type="submit" className={styles.submit}>Войти</button>
        </form>
    );
};

export default MainAuth;