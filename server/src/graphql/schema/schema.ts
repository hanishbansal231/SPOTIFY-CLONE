export const schema = `#graphql

enum Gender {
  MALE
  FEMALE
}

type Success {
  message:String
  status:Boolean
  user:User
}

type VerifySuccess {
  message:String
  status:Boolean
  user:User
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

# Define an input type for the register mutation
input RegisterInput {
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  mobile_number: String!
  gender: Gender!
}

input VerifyInput {
  email: String!
}

type Mutation {
  register(input: RegisterInput!): Success,
  userVerify(input:VerifyInput!): VerifySuccess
}


`;
