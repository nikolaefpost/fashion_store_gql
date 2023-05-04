import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";
import {handleSetRecoveryEmail} from "../../../appolo/operations/user/userStore";
import {userMailVar} from "../../../appolo/cashe/appVar";
import {useLanguage} from "../../../context/setting";

import styles from "../form.module.scss";



const ForgotPassword = ({ setIsNewPassword}) => {
    const { text } = useLanguage();
    const schema = yup
        .object({
            email: yup
                .string()
                .email(text.incorrect_email)
                .required(text.not_entered_email),
        })

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: {email: userMailVar()},
        shouldFocusError: true,

    });
    const onSubmit = handleSubmit(data => {
        handleSetRecoveryEmail(data.email);
        setIsNewPassword(false);
    });

    return (
        <form
            className={styles.user_form}
            onSubmit={onSubmit}
        >
            <h3>{text.forgot_password}?</h3>
            <p className={styles.info}>{text.description_reset_password}</p>
            <InputForm
                register={register}
                errors={errors}
                field={"email"}
                name ={text.your_email}
                inputType="text"
               />
            <button type="submit" className={styles.submit}>{text.subscribe}</button>

        </form>
    );
};

export default ForgotPassword;