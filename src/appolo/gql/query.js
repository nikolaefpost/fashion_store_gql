import {gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
    query MyQuery {
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