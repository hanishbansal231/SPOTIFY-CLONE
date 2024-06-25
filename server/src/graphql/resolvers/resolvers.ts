import { getAllUser, register } from '@controllers/user.controller';

const resolvers = {
   Query: {
      users: getAllUser
   },
   Mutation: {
      register: register
   }
};

export default resolvers;
