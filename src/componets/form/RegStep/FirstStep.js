import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";
import GoogleAuth from "../GoogleAuth";
import { useReactiveVar} from "@apollo/client";
import {authErrorVar} from "../../../appolo/cashe/appVar";
import {createUserFireBase} from "../../../appolo/operations/user/userStore";

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

const FirstStep = ({ form, handleTransition, setModal}) => {
    const errorMessage = useReactiveVar(authErrorVar);

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
        createUserFireBase(data.email, data.password);
    });

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
            <GoogleAuth setModal={setModal}/>
        </>
    );
};

export default FirstStep;