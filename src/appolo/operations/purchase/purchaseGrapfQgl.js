import {gql} from "@apollo/client";

export const GET_PURCHASE = gql`
    query MyProduct {
        queryProduct {
            availability
            brand {
                brand
                brand_ua
            }
            category {
                category
                category_ua
            }
            color {
                color
                color_ua
                id
            }
            description_care
            description_care_ua
            description_composition
            description_composition_ua
            description_details
            description_details_ua
            id
            image_src
            name
            name_ua
            price
            quantity
            size
            new
        }
    }
`

export const SET_PURCHASE = gql`
    mutation AddPurchase($buyer: UserRef!, $date: String!, $deliveryInfo: DeliveryInfoRef!, $orders: [OrderRef!]!, $status: Int!, $total: Float!, $bonus: Int ) {
  addPurchase(input: {
    buyer: $buyer,
    date: $date,
    deliveryInfo: $deliveryInfo,
    orders: $orders,
    status: $status,
    total: $total
    bonus: $bonus
  }) {
    purchase {
      orderNumber
      date
    }
  }
}
`