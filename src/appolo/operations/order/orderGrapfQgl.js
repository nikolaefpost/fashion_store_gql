import {gql} from "@apollo/client";

export const GET_ORDERS_LOCAL = gql`
  query GetOrderLocal {
    orders @client
  }
`;