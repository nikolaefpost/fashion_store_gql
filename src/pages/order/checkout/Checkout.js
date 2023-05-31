import React, {useEffect} from 'react';
import cn from "classnames";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import InputForm from "../../../componets/inputForm/InputForm";
import InputFormRadio from "../../../componets/inputForm/InputFormRadio";
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useMutation} from "@apollo/client";
import {SET_PURCHASE} from "../../../appolo/operations/purchase/purchaseGrapfQgl";
import {setPurchase} from "../../../appolo/operations/purchase/purchaseStore";
import {deleteOrder} from "../../../appolo/operations/order/orderStore";
import {useLanguage} from "../../../context/setting";
import {useMediaQuery} from "../../../helpers/useMediaQuery";

import styles from "./checkout.module.scss";

const phoneRegExp = /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/
const currentMaxBonus = 100;

const Checkout = ({
                      formPersonalInfo,
                      formDeliveryRadio,
                      formDeliveryAddress,
                      formPaymentRadio,
                      sum,
                      user
                  }) => {
    const isMobile = useMediaQuery(500);
    const {text, lang} = useLanguage();

    const schema = yup
        .object({
            name: yup
                .string()
                .min(2, text.name_contain)
                .required(text.no_name),
            surname: yup
                .string()
                .required(text.no_last_name)
                .min(2, text.last_name_contain),
            email: yup
                .string()
                .email(text.incorrect_email)
                .required(text.not_entered_email),
            telephone: yup
                .string()
                .required(text.no_phone)
                .matches(phoneRegExp, text.invalid_phone),
            delivery: yup
                .string()
                .required(text.no_delivery_method),
            city: yup
                .string()
                .required(text.no_delivery_city),
            postOffice: yup
                .string()
                .required(text.no_post_office),
            payment: yup
                .string()
                .required(text.choose_payment),
            bonus: yup
                .number()
                .typeError(text.enter_integer)
                .min(0, text.positive_number)
                .max(currentMaxBonus, `${text.bonus_is}: ${currentMaxBonus}`)
                .integer(text.enter_number)
        })

    const [addPurchase, { data, loading, error }] = useMutation(SET_PURCHASE)
    const navigate = useNavigate();
    const {
        register,
        formState: {errors},
        handleSubmit,
        watch,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        values: user,
        shouldFocusError: true,
        defaultValues: {
            bonus: 0
        }

    });
    const watchAllFields = watch();

    const onSubmit = handleSubmit(data => {
        if (data.bonus > currentMaxBonus) data.bonus = currentMaxBonus;
        setPurchase(data, addPurchase)

    });

    useEffect(()=>{
      if (data?.addPurchase) {
          deleteOrder()
          navigate("/personal")
      }
    }, [data])

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error?.message}`;

    return (
        <div className={styles.checkout}>
            <h3>{text.checkout_title}</h3>
            <form className={styles.content} onSubmit={onSubmit} noValidate>
                <div className={styles.left_side}>
                    <h4>{text.personal_info}:</h4>
                    <div className={styles.personal_information}>
                        {formPersonalInfo.map(item => <InputForm
                            key={item.field}
                            register={register}
                            errors={errors}
                            field={item.field}
                            name={item.name}
                            inputType={item.type}
                        />)}
                    </div>
                    <h4>{text.delivery_method}:</h4>
                    {!isMobile && <div className={styles.delivery_method}>
                        <div className={styles.methods}><h4>{text.in_Ukraine}:</h4></div>
                        <div className={styles.methods}><h4>{text.inter_delivery}:</h4></div>
                    </div>}
                    <div className={cn(styles.delivery, {[styles.error_border]: errors.delivery})}>
                        {!!errors.delivery && <span className={styles.error}>{errors.delivery.message}</span>}
                        {isMobile  && <div className={styles.methods}><h4>{text.in_Ukraine}:</h4></div>}
                        {formDeliveryRadio.map((el, i) => {
                            if (i<2) return (
                                <InputFormRadio
                                    key={el.id}
                                    field={el.field}
                                    value={lang === "Eng" ? el.value : el.value_ua}
                                    label={lang === "Eng" ? el.name : el.name_ua}
                                    register={register}
                                    id={el.id} name={el.field}
                                />
                            )
                        })}
                        {isMobile  && <div className={styles.methods}><h4>{text.inter_delivery}:</h4></div>}
                        {formDeliveryRadio.map((el, i) => {
                            if (i>1) return (
                                <InputFormRadio
                                    key={el.id}
                                    field={el.field}
                                    value={lang === "Eng" ? el.value : el.value_ua}
                                    label={lang === "Eng" ? el.name : el.name_ua}
                                    register={register}
                                    id={el.id} name={el.field}
                                />
                            )
                        })}

                    </div>
                    <h4>{text.delivery_address}:</h4>
                    <div className={styles.delivery_method}>
                        {formDeliveryAddress.map(item => (
                            <div className={styles.methods} key={item.field}>
                                <InputForm
                                    key={item.field}
                                    register={register}
                                    errors={errors}
                                    field={item.field}
                                    name={lang === "Eng" ? item.name: item.name_ua}
                                    inputType={item.type}
                                />
                            </div>
                        ))}
                    </div>
                    <h4>{isMobile? text.payment_method: text.pay_method}:</h4>
                    <div className={cn(styles.delivery, {[styles.error_border]: errors.payment})}>
                        {!!errors.payment && <span className={styles.error}>{errors.payment.message}</span>}
                        {formPaymentRadio.map(el => (
                            <InputFormRadio
                                key={el.id}
                                field={el.field}
                                value={lang === "Eng" ? el.value : el.value_ua}
                                label={lang === "Eng" ? el.name: el.name_ua}
                                register={register}
                                id={el.id} name={el.field}
                            >{el.children && el.children.map(item => (
                                <img className={styles[item.style]} key={item.style} src={item.src} alt="payment"/>
                            ))}</InputFormRadio>
                        ))}
                    </div>
                    <h4>{text.using_bonus}:</h4>
                    <InputForm
                        register={register}
                        field="bonus"
                        errors={errors}
                        name={text.write_off_bonus}
                        inputType="number"
                    />
                </div>
                <div className={styles.right_side}>
                    <div className={styles.links}>
                        <Link to="/personal" >{text.enter_account}</Link>
                        <Link to="/payment&delivery" className={styles.text_transform}>{text.delivery_terms}</Link>
                        <Link to="/exchange" className={styles.text_transform}>{text.terms_exchange}</Link>
                        <Link to="/payment&delivery" className={styles.text_transform}>{text.payment_information}</Link>
                    </div>
                    <div className={styles.final}>
                        <div className={styles.info_field}>
                            <span>{text.delivery}:</span>
                            <span>{watchAllFields?.delivery}</span>
                        </div>
                        <div className={styles.info_field}>
                            <span>{text.bonuses}:</span>
                            <span>{watchAllFields?.bonus && `-${watchAllFields?.bonus}`}</span>
                        </div>
                        <div className={styles.info_field}>
                            <span>{text.total}:</span>
                            <span>{watchAllFields?.bonus ? sum - watchAllFields?.bonus : sum} {text.currency}</span>
                        </div>
                        <button type="submit">{text.checkout}</button>
                    </div>


                    <p>{text.accept_terms} <u>{text.public_offer}</u> {text.i} <u>{text.privacy_policy}</u>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default observer(Checkout);