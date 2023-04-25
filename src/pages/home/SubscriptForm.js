import React, {useEffect} from 'react';
import InputForm from "../../componets/inputForm/InputForm";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useMutation} from "@apollo/client";
import {ADD_MAIL} from "../../appolo/operations/mailingList/MailingListGraphQgl";

import styles from "./home.module.scss";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Неверный адрес электронной почты")
            .required("Адрес электронной почты не введен"),
    })

const SubscriptForm = () => {
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
            <InputForm register={register} errors={errors} field={"email"} name="Ваш e-mail*" inputType="text" center />
            {error && <div className={styles.has_already}>This mail is already subscribed</div>}
            <button type="submit">ПОДПИСАТЬСЯ</button>
            <p>
                Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих персональных данных
                и ознакомлен(а) с условиями конфиденциальности.
            </p>
        </form>
    );
};

export default SubscriptForm;