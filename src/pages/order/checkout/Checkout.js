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

import styles from "./checkout.module.scss";

const phoneRegExp = /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/

const currentMaxBonus = 100;
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
        delivery: yup
            .string()
            .required("Выберете способ доставки"),
        city: yup
            .string()
            .required("Город доставки не введен"),
        postOffice: yup
            .string()
            .required("Отделение почты не введено"),
        payment: yup
            .string()
            .required("Выберете способ оплаты"),
        bonus: yup
            .number()
            .typeError('Введите целое положительно число')
            .min(0, "Введите положительно число")
            .max(currentMaxBonus, `ваш бонус составляет: ${currentMaxBonus}`)
            .integer("Введите целое число")
    })


const Checkout = ({
                      formPersonalInfo,
                      formDeliveryRadio,
                      formDeliveryAddress,
                      formPaymentRadio,
                      sum,
                      user
                  }) => {
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

    });
    const watchAllFields = watch();

    const onSubmit = handleSubmit(data => {
        if (data.bonus > currentMaxBonus) data.bonus = currentMaxBonus;
        setPurchase(data, addPurchase)

    });

    useEffect(()=>{
        console.log(data)
      if (data?.addPurchase) {
          deleteOrder()
          navigate("/personal")
      }
    }, [data])

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error?.message}`;

    return (
        <div className={styles.checkout}>
            <h3>Оформление заказа</h3>
            <form className={styles.content} onSubmit={onSubmit} noValidate>
                <div className={styles.left_side}>
                    <h4>Персональные данные:</h4>
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
                    <h4>Способ доставки:</h4>
                    <div className={styles.delivery_method}>
                        <div className={styles.methods}><h4>По Украине:</h4></div>
                        <div className={styles.methods}><h4>Международная доставка:</h4></div>
                    </div>
                    <div className={cn(styles.delivery, {[styles.error_border]: errors.delivery})}>
                        {!!errors.delivery && <span className={styles.error}>{errors.delivery.message}</span>}
                        {formDeliveryRadio.map(el => (
                            <InputFormRadio
                                key={el.id}
                                field={el.field}
                                value={el.value}
                                label={el.name}
                                register={register}
                                id={el.id} name={el.field}
                            />
                        ))}
                    </div>
                    <h4>Адрес доставки:</h4>
                    <div className={styles.delivery_method}>
                        {formDeliveryAddress.map(item => (
                            <div className={styles.methods} key={item.field}>
                                <InputForm
                                    key={item.field}
                                    register={register}
                                    errors={errors}
                                    field={item.field}
                                    name={item.name}
                                    inputType={item.type}
                                />
                            </div>
                        ))}
                    </div>
                    <h4>Вы можете оплатить покупку одним из ниже перечисленных способов:</h4>
                    <div className={cn(styles.delivery, {[styles.error_border]: errors.payment})}>
                        {!!errors.payment && <span className={styles.error}>{errors.payment.message}</span>}
                        {formPaymentRadio.map(el => (
                            <InputFormRadio
                                key={el.id}
                                field={el.field}
                                value={el.value}
                                label={el.name}
                                register={register}
                                id={el.id} name={el.field}
                            >{el.children && el.children.map(item => (
                                <img className={styles[item.style]} key={item.style} src={item.src} alt="payment"/>
                            ))}</InputFormRadio>
                        ))}
                    </div>
                    <h4>Использование бонусного счёта:</h4>
                    <InputForm
                        register={register}
                        field="bonus"
                        errors={errors}
                        name="Сумма списания бонусов*"
                        inputType="number"
                    />
                </div>
                <div className={styles.right_side}>
                    <Link to="/personal" >Войти в личный кабинет</Link>
                    <Link to="card" className={styles.text_transform}>УСЛОВИЯ ДОСТАВКИ</Link>
                    <Link to="card" className={styles.text_transform}>УСЛОВИЯ ОБМЕНА И ВОЗВРАТА</Link>
                    <Link to="card" className={styles.text_transform}>ИНФОРМАЦИЯ ОБ ОПЛАТЕ</Link>
                    <div className={styles.info_field}>
                        <span>ДОСТАВКА:</span>
                        <span>{watchAllFields?.delivery}</span>
                    </div>
                    <div className={styles.info_field}>
                        <span>БОНУСЫ:</span>
                        <span>{watchAllFields?.bonus}</span>
                    </div>
                    <div className={styles.info_field}>
                        <span>ИТОГО:</span>
                        <span>{watchAllFields?.bonus ? sum - watchAllFields?.bonus : sum} грн</span>
                    </div>
                    <button type="submit">ОФОРМИТЬ ЗАКАЗ</button>
                    <p>Нажимая на кнопку «оплатить заказ», я принимаю условия <u>публичной оферты</u> и <u>политики
                        конфиденциальности</u>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default observer(Checkout);