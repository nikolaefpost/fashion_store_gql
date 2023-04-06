import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../inputForm/InputForm";

import styles from "../form.module.scss";

const schema = yup
    .object({
        code: yup
            .string()
            .required("Код не введен")
    })

const SecondStep = ({ secondForm, setIsCheckEmail, setModal}) => {

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        shouldFocusError: true,

    });

    const onSubmit = handleSubmit(data => {
        if (data.code.length>1) {
            //тут проверка кода из почты
            setIsCheckEmail(true);
            setTimeout(()=>setModal(false),0);
        }
    });
    return (
        <form onSubmit={onSubmit} className={styles.user_form}>
            <h3>Регистрация - шаг 2</h3>
            {secondForm.map(item => <InputForm
                key={item.field}
                register={register}
                errors={errors}
                field={item.field}
                name={item.name}
                inputType={item.type}
            />)}
            <button type="submit" className={styles.submit}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
        </form>
    );
};

export default SecondStep;