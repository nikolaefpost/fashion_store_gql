import {gql} from "@apollo/client";

export const ADD_MAIL = gql`
   mutation AddMailingList($email: String!) {
  addMailingList(input: {email: $email}) {
    mailingList {
      email
    }
  }
}
`