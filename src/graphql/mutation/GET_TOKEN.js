import { gql } from "apollo-boost";

export const GET_TOKEN = gql`
mutation loginWithEmail($email: String!,$password: String!) {
  loginWithEmail(email:$email , password: $password ){
    token
  }
}
`;