import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";

import styles from "../form.module.scss";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Неверный адрес электронной почты")
            .required("Адрес электронной почты не введен"),
    })

const ForgotPassword = ({handleSetRecoveryEmail, setIsNewPassword}) => {

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
        handleSetRecoveryEmail(data);
        setIsNewPassword(false);
    });

    return (
        <form
            className={styles.user_form}
            onSubmit={onSubmit}
        >
            <h3>Забыли пароль?</h3>
            <p className={styles.info}>
                Введите свою почту и мы отправим вам код для сброса пароля и восстановления аккаунта:
            </p>
            <InputForm
                register={register}
                errors={errors}
                field={"email"}
                name="Ваш e-mail*"
                inputType="text"
               />
            <button type="submit" className={styles.submit}>ПОДПИСАТЬСЯ</button>

        </form>
    );
};

export default ForgotPassword;