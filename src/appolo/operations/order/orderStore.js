import {orderItemsVar} from "../../cashe/appVar";
import {getProduct} from "../poducts/productStore";
const storage = window.localStorage;

export const getOrderStorage = () => {
    if (storage.getItem("orderList")) {
        orderItemsVar(JSON.parse(storage.getItem("orderList")));
    }
}

export const getNumberProducts = () => {
    if (storage.getItem("orderList")) {
        return JSON.parse(storage.getItem("orderList")).length;
    }else return 0
}

export const setProducts = (product) => {
    let order = orderItemsVar()
    // if (order.some(pr => pr.product.id === product.product.id)) return;
    orderItemsVar([...order, product])
    storage.setItem("orderList", JSON.stringify(orderItemsVar()));
}

export const decQuantityItem = (id) => {
    orderItemsVar(orderItemsVar().map(el => el.id === id ? {...el, quantity: el.quantity - 1} : el));
    storage.setItem("orderList", JSON.stringify(orderItemsVar()));
}

export const incQuantityItem = (id) => {
    console.log(id)
    orderItemsVar(orderItemsVar().map(el => el.id === id ? {...el, quantity: el.quantity + 1} : el));
    storage.setItem("orderList", JSON.stringify(orderItemsVar()));
}

export const deleteProduct = (id) => {
    orderItemsVar(orderItemsVar().filter(el => el.id !== id));
    storage.setItem("orderList", JSON.stringify(orderItemsVar()));
}

export const deleteOrder = () => {
    orderItemsVar([]);
    storage.setItem("orderList", JSON.stringify(orderItemsVar()));
}

export const getTotal = () => {
    return orderItemsVar().reduce((acc, cur) => {
        const product = getProduct(cur.product.id)
        return product.price ? acc + cur.quantity * product?.price : 0;
    }, 0).toFixed()
}