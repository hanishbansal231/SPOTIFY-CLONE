import { getAllUser, register,userVerify } from '@controllers/user.controller';

const resolvers = {
   Query: {
      users: getAllUser
   },
   Mutation: {
      register: register,
      userVerify:userVerify
   }
};

export default resolvers;
