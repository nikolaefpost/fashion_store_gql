import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../componets/inputForm/InputForm";
import {observer} from "mobx-react-lite";

import styles from "./personalArea.module.scss";

const phoneRegExp = /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/

const schema = yup
    .object({
        name: yup
            .string()
            .min(2, "Имя должно содержать минимум 2 символов")
            .required("Имя не введено"),
        surname: yup
            .string()
            .required("Фамилия не введена")
            .min(2, "Фамилия должна содержать минимум 2 символов"),
        email: yup
            .string()
            .email("Неверный адрес электронной почты")
            .required("Адрес электронной почты не введен"),
        telephone: yup
            .string()
            .required("Телефон не введен")
            .matches(phoneRegExp, 'Не правильный номер телефона'),
        city: yup
            .string()
            .required("Город доставки не введен"),
        postOffice: yup
            .string()
            .required("Отделение почты не введено"),
    })

const AllData = ({user, formPersonalInfo, formDeliveryAddress, handleSetUser}) => {

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: user,
        shouldFocusError: true,

    });

    const onSubmit = handleSubmit(data => {
        handleSetUser(data)
    });

    return (
        <form className={styles.all_data} onSubmit={onSubmit}>
            <h4>Персональные данные:</h4>
            <div className={styles.formPersonalInfo}>
                {formPersonalInfo.map(item => <InputForm
                    key={item.field}
                    register={register}
                    errors={errors}
                    field={item.field}
                    name={item.name}
                    inputType={item.type}
                />)}
            </div>
            <h4>Адрес доставки:</h4>
            <div className={styles.formPersonalInfo}>
                {formDeliveryAddress.map(item => <InputForm
                    key={item.field}
                    register={register}
                    errors={errors}
                    field={item.field}
                    name={item.name}
                    inputType={item.type}
                />)}
            </div>
            <button type="submit">ОБНОВИТЬ ИНФОРМАЦИЮ</button>
        </form>
    );
};

export default observer(AllData);