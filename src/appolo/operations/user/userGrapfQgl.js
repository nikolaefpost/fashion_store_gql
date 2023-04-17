import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import { currentUserVar} from "../../cashe/productVar";
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