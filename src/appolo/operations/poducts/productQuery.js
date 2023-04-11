import {gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
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

export const GET_PRODUCT_LOCAL = gql`
  query GetProductLocal {
    productList @client
  }
`;

export const GET_CATEGORY = gql`
    query MyCategory {
  queryCategory {
    category
    category_ua
  }
}
`

export const GET_CATEGORY_LOCAL = gql`
  query GetCategoryLocal {
    categoryLocal @client
  }
`;

export const GET_COLOR = gql`
  query MyColor {
    queryColor {
        color
        color_ua
        id
    }
}
`;