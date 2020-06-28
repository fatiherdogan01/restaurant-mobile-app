import { gql } from "apollo-boost";
export const GET_USER = gql`
query{
  user{
    ...addresses
    createdAt
    email
    emailVerified
    firebaseUserUid
    firstName
    lastName
    mobileNumber
    smsVerified
    uid
  }
}
fragment addresses on User{
  addresses{
    addressIconId
    addressLine1
    addressLine2
    adminWard
    default
    flatNumber
    fullName
    geoEnabled
    id
    lat
    lon
    postalCode
    slugAdminWard
    tips
    title
  }
}
`;
