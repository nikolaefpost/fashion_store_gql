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
        id
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
    favorites {
      id
      image_src
      name
      name_ua
      price
      size
      color {
        id
      }
    }
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

export const UPDATE_FAVORITES = gql`
mutation UpdateFavorites($favorites: [ProductRef], $email: StringHashFilter) {
  updateUser(input: {filter: {email: $email}, set: {favorites: $favorites}}) {
    user {
      email
    }
  }
}
`;

export const DELETE_FAVORITES = gql`
mutation deleteFavorites($favorites: [ProductRef], $email: StringHashFilter) {
  updateUser(input: {filter: {email: $email}, remove: {favorites: $favorites}}) {
    user {
      email
    }
  }
}
`;


export const GET_USER_LOCAL = gql`
  query GetUserLocal {
    currentUser @client
  }
`;