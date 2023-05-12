import React from 'react';
import InputForm from "../../inputForm/InputForm";
import {useLanguage} from "../../../context/setting";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {BiSearch} from "react-icons/bi"

import styles from "../navMobile.module.scss"

const SearchForm = () => {
    const {text} = useLanguage();
    const schema = yup
        .object({
            request: yup
                .string()
                .required(text.not_request),
        })

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
        console.log(data)
    });
    return (
        <form className={styles.search_form}>
            <InputForm name={text.enter_request} register={register} errors={errors} field="request" search />
            <div className={styles.search_icon} onClick={onSubmit}><BiSearch size="20px"/></div>
        </form>
    );
};

export default SearchForm;