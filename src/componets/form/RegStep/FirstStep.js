import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";
import GoogleAuth from "../GoogleAuth";
import { useReactiveVar} from "@apollo/client";
import {authErrorVar} from "../../../appolo/cashe/appVar";
import {createUserFireBase} from "../../../appolo/operations/user/userStore";
import {useLanguage} from "../../../context/setting";

import styles from "../form.module.scss";




const FirstStep = ({ form, handleTransition, setModal}) => {
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
            <h3>{text.registration}</h3>
            {form.map(item => <InputForm
                key={item.field}
                register={register}
                errors={errors}
                field={item.field}
                name={lang === "Eng"? item.name: item.name_ua}
                inputType={item.type}
            />)}
            <div className={styles.help_block}>
                <button className={styles.help_button} onClick={handleTransition}>{text.go_to_login}</button>
            </div>
            {errorMessage !== "" && <div className={styles.error}>{errorMessage}</div>}
            <button type="submit" className={styles.submit}>{text.continue}</button>

        </form>
            <GoogleAuth setModal={setModal}/>
        </>
    );
};

export default FirstStep;