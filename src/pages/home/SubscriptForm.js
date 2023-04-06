import React from 'react';
import InputForm from "../../componets/inputForm/InputForm";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import rootStore from "../../store/rootStore";
import {observer} from "mobx-react-lite";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Неверный адрес электронной почты")
            .required("Адрес электронной почты не введен"),
    })

const SubscriptForm = () => {
    const { userStore } = rootStore;
    const {
        register,
        formState: {errors},
        handleSubmit,
        clearErrors
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        shouldFocusError: true,

    });
    const onSubmit = handleSubmit(data => userStore.handleSetSubscriptEmail(data));

    return (
        <form onSubmit={onSubmit} onClick={()=>clearErrors("email")}>
            <InputForm register={register} errors={errors} field={"email"} name="Ваш e-mail*" inputType="text" center />
            <button type="submit">ПОДПИСАТЬСЯ</button>
            <p>
                Нажимая на кнопку «Подписаться», я соглашаюсь на обработку моих персональных данных
                и ознакомлен(а) с условиями конфиденциальности.
            </p>
        </form>
    );
};

export default observer(SubscriptForm);