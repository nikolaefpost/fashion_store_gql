import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../componets/inputForm/InputForm";
import {useMutation, useReactiveVar} from "@apollo/client";
import {currentUserVar} from "../../appolo/cashe/appVar";
import {UPDATE_USER} from "../../appolo/operations/user/userGrapfQgl";

import styles from "./personalArea.module.scss";

const phoneRegExp = /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/

const schema = yup
    .object({
        name: yup
            .string(),
            // .min(2, "Имя должно содержать минимум 2 символов"),
        surname: yup
            .string(),
            // .min(2, "Фамилия должна содержать минимум 2 символов"),
        email: yup
            .string()
            .email("Неверный адрес электронной почты")
            .required("Адрес электронной почты не введен"),
        telephone: yup
            .string()
            .required("Телефон не введен")
            .matches(phoneRegExp, 'Не правильный номер телефона'),
        city: yup
            .string(),
            // .required("Город доставки не введен"),
        postOffice: yup
            .string(),
            // .required("Отделение почты не введено"),
    })

const AllData = ({ formPersonalInfo, formDeliveryAddress }) => {

    const currentUser = useReactiveVar(currentUserVar);
    const [updateUser, { data }] = useMutation(UPDATE_USER);
    console.log(currentUser)

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: currentUser,
        shouldFocusError: true,

    });

    const onSubmit = handleSubmit(data => {
        updateUser({
            variables: {
                patch:
                    {
                        filter: {
                            email: {
                                eq: data.email
                            }
                        },
                        set: {
                            name: data.name,
                            surname: data.surname,
                            telephone: data.telephone,
                            city: data.city,
                            postOffice: data.postOffice,
                        }
                    }
            }
        }).catch(e=>console.log(e))
    });

    useEffect(()=>{
        console.log(data)
        if (data) {
            location.reload()
        }

        // currentUserVar()
    },[data])



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

export default AllData;