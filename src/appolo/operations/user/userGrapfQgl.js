import {gql} from "@apollo/client";

export const ADD_USER = gql`
 mutation AddUser($email: String!, $token: String!) {
  addUser(input: {email: $email, token: $token}) {
    numUids
    user {
      email
    }
  }
}
`;

export const AUTH_USER = gql`
 query CheckQuery($email: String!, $token: String!) {
  checkUserPassword(email: $email, token: $token) {
    email
  }
}
`;

export const GET_USER = gql`
 query GetUserPurchase($email: String!) {
  getUser(email: $email) {
    purchases {
      date
      orderNumber
      orders {
        color
        quantity
        size
        product {
          name
          name_ua
          image_src
          id
          price
        }
      }
      status
      total
      bonus
      deliveryInfo {
        city
        delivery
        email
        name
        payment
        postOffice
        surname
        telephone
      }
    }
    surname
    telephone
    city
    email
    name
    postOffice
  }
}
`;



export const UPDATE_USER = gql`
mutation UpdateUser($patch: UpdateUserInput!) {
  updateUser(input: $patch) {
    user {
      email
      city
      name
      postOffice
      surname
      telephone
    }
  }
}
`;


export const GET_USER_LOCAL = gql`
  query GetUserLocal {
    currentUser @client
  }
`;