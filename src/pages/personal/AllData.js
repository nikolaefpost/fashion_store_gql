import React, {useEffect} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../componets/inputForm/InputForm";
import {useMutation, useReactiveVar} from "@apollo/client";
import {currentUserVar} from "../../appolo/cashe/appVar";
import {UPDATE_USER} from "../../appolo/operations/user/userGrapfQgl";

import styles from "./personalArea.module.scss";
import {useLanguage} from "../../context/setting";

const phoneRegExp = /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/



const AllData = ({ formPersonalInfo, formDeliveryAddress }) => {
    const {text, lang} = useLanguage();

    const schema = yup
        .object({
            name: yup
                .string(),
            surname: yup
                .string(),
            email: yup
                .string()
                .email(text.incorrect_email)
                .required(text.not_entered_email),
            telephone: yup
                .string()
                .required(text.no_phone)
                .matches(phoneRegExp, text.invalid_phone),
            city: yup
                .string(),
            postOffice: yup
                .string(),
        })

    const currentUser = useReactiveVar(currentUserVar);
    const [updateUser, { data }] = useMutation(UPDATE_USER);

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
        if (data) {
            location.reload()
        }
    },[data])



    return (
        <form className={styles.all_data} onSubmit={onSubmit}>
            <h4>{text.personal_info}:</h4>
            <div className={styles.formPersonalInfo}>
                {formPersonalInfo.map(item => <InputForm
                    key={item.field}
                    register={register}
                    errors={errors}
                    field={item.field}
                    name={lang === "Eng" ? item.name: item.name_ua}
                    inputType={item.type}
                />)}
            </div>
            <h4>{text.delivery_address}:</h4>
            <div className={styles.formPersonalInfo}>
                {formDeliveryAddress.map(item => <InputForm
                    key={item.field}
                    register={register}
                    errors={errors}
                    field={item.field}
                    name={lang === "Eng" ? item.name: item.name_ua}
                    inputType={item.type}
                />)}
            </div>
            <button type="submit">{text.update_info}</button>
        </form>
    );
};

export default AllData;