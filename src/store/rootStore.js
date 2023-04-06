import {OrderData} from "./orderData";
import {UserData} from "./userData";
import {ProductData} from "./productStore";

export class RootStore {
    constructor() {
        this.orderStore = new OrderData(this)
        this.userStore = new UserData(this)
        this.productStore = new ProductData(this)
    }
}

export default new RootStore;