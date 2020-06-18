//import users data
import { users } from '../models';

//Define resolvers
export default {
  Query: {
    //Resolver for 'user' queries by ID
    user: async (parent, { id }) => {
      const userById = users.find((user) => user.id === id);
      return userById;
    }
  },
  User: {
    //Reference resolver - used by services querying user data
    //Resover for 'user' queries by wallet ID
    __resolveReference(reference) {
      const { walletId } = reference;
      return users.find((user) => user.walletId === walletId);
    }
  }
};