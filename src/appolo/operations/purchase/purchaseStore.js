import { getTotal} from "../order/orderMutations";
import {currentUserVar, orderItemsVar} from "../../cashe/productVar";

const options = {day: 'numeric', month: 'numeric', year: 'numeric'};

export const setPurchase = (deliveryInfo, addPurchase) => {
    const today = new Date();
    addPurchase({
        variables: {
            buyer: {email: currentUserVar().email},
            date: today.toLocaleDateString('de-DE', options),
            orders: orderItemsVar(),
            deliveryInfo: {
                city: deliveryInfo.city,
                delivery: deliveryInfo.delivery,
                email: deliveryInfo.email,
                name: deliveryInfo.name,
                payment: deliveryInfo.payment,
                postOffice: deliveryInfo.postOffice,
                surname: deliveryInfo.surname,
                telephone: deliveryInfo.telephone,
            },
            status: "В работе",
            total: getTotal(),
            bonus: deliveryInfo.bonus
        }
    }).catch(e => console.log(e, e?.message))
}