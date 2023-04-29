import {mastercard, privat24, visa} from "../../../assets/icon";

export const form = [
    {field: "email", name: "Ваш e-mail*", type: "text"},
    {field: "password", name: "Ваш пароль*", type: "password"},
];
export const formStep2 = [{field: "code", name: "Код с e-mail*", type: "text"}]
export const formPersonalInfo = [
    {field: "name", name: "Your name*", name_ua: "Ваше ім'я*", type: "text"},
    {field: "surname", name: "Your last name*", name_ua: "Ваше прізвище*", type: "text"},
    {field: "email", name: "Your e-mail*", name_ua: "Ваш e-mail*", type: "text"},
    {field: "telephone", name: "Your phone number*", name_ua: "Ваш телефон*", type: "text"},
]

export const formDeliveryRadio = [
    {field: "delivery", name: "Pickup - Nikolaev st. Dachnaya 13", name_ua: "Самовивіз - Миколаїв вул. Дачна 13", id: "d1", value: "Pickup", value_ua: "Самовивіз"},
    {field: "delivery", name: "Ukrapochta / 1-3 weeks / 30$", name_ua: "Укрпошта / 1-3 тижні / 30$", id: "d3", value: "According to the carrier's rates", value_ua: "За тарифами перевізника"},
    {field: "delivery", name: "Nova Poshta", name_ua: "Нова Пошта", id: "d2", value: "According to the carrier's rates", value_ua: "За тарифами перевізника"},
    {field: "delivery", name: "DHL / 3-7 days / 60$", name_ua: "DHL / 3-7 днів / 60 $", id: "d4", value: "According to the carrier's rates", value_ua: "За тарифами перевізника"}
]

export const formDeliveryAddress = [
    {field: "city", name: "City*", name_ua: "Місто*", type: "text"},
    {field: "postOffice", name: "Post office*", name_ua: "Відділення пошти*", type: "text"},
]

export const formPaymentRadio = [
    {
        field: "payment",
        name: "Full prepayment through Privat 24",
        name_ua: "Повна передплата через Приват 24",
        id: "p1",
        value: "Privat24",
        children: [{src: privat24, style: "privat24"}]
    },
    {
        field: "payment",
        name: "Money transfer Visa/MasterCard",
        name_ua: "Грошовим переказом Visa/MasterCard",
        id: "p2",
        value: "Remittance",
        children: [{src: visa, style: "visa"}, {src: mastercard, style: "mastercard"}]
    },
    {field: "payment",
        name: "Cash on delivery at the NP branch",
        name_ua: "Післяплатою у відділенні НП",
        id: "p3",
        value: "C.O.D"
    },
]