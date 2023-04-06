import {
    makeAutoObservable,
    configure,
} from "mobx";

configure({enforceActions: 'observed'})

const options = {day: 'numeric', month: 'numeric', year: 'numeric'};

export class OrderData {
    purchase = [];
    order = [];
    orderNumber = 1;
    storage = window.localStorage;


    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false})
        this.rootStore = rootStore
        this.getOrderStorage()
        this.getPurchaseStorage()
        this.getOrderNumberStorage()
    }


    setProducts = (product) => {
        if (this.order.some(pr => pr.id === product.id)) return;
        this.order.push(product)
        this.storage.setItem("orderList", JSON.stringify(this.order));
    }

    decQuantity = (id) => {
        this.order = this.order.map(el => el.id === id ? {...el, quantity: el.quantity - 1} : el);
        this.storage.setItem("orderList", JSON.stringify(this.order));
    }

    incQuantity = (id) => {
        this.order = this.order.map(el => el.id === id ? {...el, quantity: el.quantity + 1} : el);
        this.storage.setItem("orderList", JSON.stringify(this.order));
    }

    deleteProduct = (id) => {
        this.order = this.order.filter(el => el.id !== id);
        this.storage.setItem("orderList", JSON.stringify(this.order));
    }

    setPurchase = (deliveryInfo) => {
        const today = new Date();
        const currentPurchase = {
            date: today.toLocaleDateString('de-DE', options),
            orderNumber: this.orderNumber++,
            order: this.order,
            deliveryInfo: deliveryInfo,
            status: "В работе",
            total: this.getTotal()
        }
        this.purchase.push(currentPurchase);
        this.storage.setItem("purchaseList", JSON.stringify(this.purchase));
        this.storage.setItem("orderNumber", JSON.stringify(this.orderNumber));
        this.order = []
        this.deleteOrderStorage()

    }

    getOrderStorage = () => {
        if (this.storage.getItem("orderList")) {
            this.order = JSON.parse(this.storage.getItem("orderList"));
        }
    }

    getPurchaseStorage = () => {
        if (this.storage.getItem("purchaseList")) {
            this.purchase = JSON.parse(this.storage.getItem("purchaseList"));
        }
        // this.storage.setItem("purchaseList", JSON.stringify([]));
    }

    getOrderNumberStorage = () => {
        if (this.storage.getItem("orderNumber")) {
            this.orderNumber = this.storage.getItem("orderNumber");
        }
    }

    deleteOrderStorage = () => {
        this.storage.orderList = [];
    }

    deletePurchaseStorage = () => {
        this.storage.purchaseList = [];
    }

    getTotal() {
        return this.order.reduce((acc, cur) => {
            const product = this.rootStore.productStore.getProduct(cur.id)
            return product.price ? acc + cur.quantity * product?.price : 0;
        }, 0).toFixed()
    }
}