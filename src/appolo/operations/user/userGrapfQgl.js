import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {currentUserVar} from "../../cashe/productVar";
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
 query GetUser($email: String!) {
  getUser(email: $email) {
    city
    email
    name
    postOffice
    surname
    telephone
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