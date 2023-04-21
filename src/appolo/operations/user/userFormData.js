import {mastercard, privat24, visa} from "../../../assets/icon";

export const form = [
    {field: "email", name: "Ваш e-mail*", type: "text"},
    {field: "password", name: "Ваш пароль*", type: "password"},
];
export const formStep2 = [{field: "code", name: "Код с e-mail*", type: "text"}]
export const formPersonalInfo = [
    {field: "name", name: "Ваше имя*", type: "text"},
    {field: "surname", name: "Ваша фамилия*", type: "text"},
    {field: "email", name: "Ваш e-mail*", type: "text"},
    {field: "telephone", name: "Ваш телефон*", type: "text"},
]

export const formDeliveryRadio = [
    {field: "delivery", name: "Самовывоз - г. Николаев ул. Дачная 13", id: "d1", value: "Самовывоз"},
    {field: "delivery", name: "Новая Почта", id: "d2", value: "По тарифам перевозчика"},
    {field: "delivery", name: "Украпочта / 1-3 недели / 30$", id: "d3", value: "По тарифам перевозчика"},
    {field: "delivery", name: "DHL / 3-7 дней / 60$", id: "d4", value: "По тарифам перевозчика"}
]

export const formDeliveryAddress = [
    {field: "city", name: "Город*", type: "text"},
    {field: "postOffice", name: "Отделение почты*", type: "text"},
]

export const formPaymentRadio = [
    {
        field: "payment", name: "Полная предоплата через Приват 24", id: "p1", value: "Приват24",
        children: [{src: privat24, style: "privat24"}]
    },
    {
        field: "payment", name: "Денежным переводом  Visa/MasterCard", id: "p2", value: "Денежный перевод",
        children: [{src: visa, style: "visa"}, {src: mastercard, style: "mastercard"}]
    },
    {field: "payment", name: "Наложенным платежом в отделении НП", id: "p3", value: "Наложенный платеж"},
]