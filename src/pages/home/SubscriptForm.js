import React, {useEffect} from 'react';
import InputForm from "../../componets/inputForm/InputForm";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation} from "@apollo/client";
import {ADD_MAIL} from "../../appolo/operations/mailingList/MailingListGraphQgl";

import styles from "./home.module.scss";
import {useLanguage} from "../../context/setting";



const SubscriptForm = () => {
    const {text} = useLanguage();

    const schema = yup
        .object({
            email: yup
                .string()
                .email(text.incorrect_email)
                .required(text.not_entered_email),
        })

    const [addMailingList, { error }] = useMutation(ADD_MAIL)
    const {
        register,
        formState: {errors},
        handleSubmit,
        clearErrors,
        reset,
        formState,
        formState: { isSubmitSuccessful }
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        shouldFocusError: true,

    });
    const onSubmit = handleSubmit(data => {
        addMailingList({variables: data}).catch(e=>console.log(e))
    });

    useEffect(()=>{
        if (formState.isSubmitSuccessful) {
            reset({ email: '' });
        }
    },[formState, isSubmitSuccessful, reset])

    return (
        <form onSubmit={onSubmit} onClick={()=>clearErrors("email")}>
            <InputForm register={register} errors={errors} field={"email"} name={text.your_email} inputType="text" center />
            {error && <div className={styles.has_already}>{text.already_subscribed}</div>}
            <button type="submit">{text.subscribe}</button>
            <p>{text.confidentiality}</p>
        </form>
    );
};

export default SubscriptForm;