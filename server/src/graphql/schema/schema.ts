export const schema = `#graphql

enum Gender {
  MALE
  FEMALE
}

type User {
    _id:ID
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    mobile_number: Int!
    gender: Gender!
    access_token: String
    refresh_token: String
    forgotPasswordToken: String
    forgotPasswordExpiryDate: String
}

type Query {
    users:[User]
}


`;
