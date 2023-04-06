import {makeAutoObservable} from "mobx";
import {visa, mastercard, privat24 } from "../assets/icon"

export class UserData {
    user = {}
    authUser = false
    form = [
        {field: "email", name: "Ваш e-mail*", type: "text"},
        {field: "password", name: "Ваш пароль*", type: "password"},
    ];
    formStep2 = [{field: "code", name: "Код с e-mail*", type: "text"}]
    formPersonalInfo =[
        {field: "name", name: "Ваше имя*", type: "text"},
        {field: "surname", name: "Ваша фамилия*", type: "text"},
        {field: "email", name: "Ваш e-mail*", type: "text"},
        {field: "telephone", name: "Ваш телефон*", type: "text"},
    ]

    formDeliveryRadio = [
        {field: "delivery", name: "Самовывоз - г. Николаев ул. Дачная 13", id: "d1", value: "Самовывоз"},
        {field: "delivery", name: "Новая Почта", id: "d2", value: "По тарифам перевозчика"},
        {field: "delivery", name: "Украпочта / 1-3 недели / 30$", id: "d3", value: "По тарифам перевозчика"},
        {field: "delivery", name: "DHL / 3-7 дней / 60$", id: "d4", value: "По тарифам перевозчика"}
    ]

    formDeliveryAddress = [
        {field: "city", name: "Город*", type: "text"},
        {field: "postOffice", name: "Отделение почты*", type: "text"},
    ]

    formPaymentRadio = [
        {field: "payment", name: "Полная предоплата через Приват 24", id: "p1", value: "Приват24",
            children: [{src: privat24, style: "privat24"}]
        },
        {field: "payment", name: "Денежным переводом  Visa/MasterCard", id: "p2", value: "Денежный перевод",
            children: [{src:visa, style: "visa"}, {src:mastercard, style: "mastercard"}]
        },
        {field: "payment", name: "Наложенным платежом в отделении НП", id: "p3",value: "Наложенный платеж"},
    ]
    storage = window.localStorage;
    subscriptEmail = {}
    recoveryEmail = {}

    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false})
        this.rootStore = rootStore
        this.getUserStorage()
    }

    handleSetUser = (user) => {
        this.user = user
        this.storage.setItem("currentUser", JSON.stringify(user));
        this.authUser = true;
    }

    handleAuthUser = (user) => {
        if (this.user.email !== user.email) return {message: "пользователь с данным e-mail не зарегестрирован", flag: false}
        if (this.user.password !== user.password) return {message: "пароль введен не верно", flag: false}
        this.authUser = true;
        this.storage.setItem("currentUser", JSON.stringify(user));
        return {message: "", flag: true}
    }

    handleSetRecoveryEmail = (email) =>{
        this.recoveryEmail = email
    }

    handleSetSubscriptEmail = (email) => {
        this.subscriptEmail = email
    }

    deleteUser = () => {
        this.user = {}
        this.storage.setItem("currentUser", JSON.stringify({}));
        this.authUser = false;
    }

    getUserStorage = () => {
        if (this.storage.getItem("currentUser") ) {
            const current = JSON.parse(this.storage.getItem("currentUser"));
            if(current.email){
                this.user = current;
                this.authUser = true;
            }
        }
    }
}