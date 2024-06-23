import { Gender } from "@shared/enums/model.enum";

export const schema = `#graphql

type User {
    _id:ID
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    password: String!
    mobile_number: Int!
    gender: [Gender!]!
    access_token: String
    refresh_token: String
    forgotPasswordToken: String
    # forgotPasswordExpiryDate: Date
}

type Query {
    users:[User]
}


`