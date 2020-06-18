import dotenv from "dotenv";
dotenv.config();
import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import restAPI from "./rest-apis";
import resolvers from "./resolvers";
import typeDefs from './schema'; 

// Set port number
const { PORT = 5003, COINMARKETCAP_API_KEY } = process.env;

// REST API defintion
const { CoinmarketcapAPI } = restAPI;

// Initialize an Apollo Server instance
// Define the schema and resolvers for the federated service
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => {
    return {
      // Define the data sources
      coinmarketcapAPI: new CoinmarketcapAPI()
    };
  },
  context: async ({ req }) => {
    const authToken = req.headers['x-auth-key'];

    //verify token
    // we could decrypt our token here in production
    const authorised = authToken === 'encrypted secret key to decrypt';

    if(authToken && !authorised) {
      //Throw an error if the gateway auth token isn't valid
      throw new AuthenticationError('Auth Failure');
    }

    const cmcApiKey = COINMARKETCAP_API_KEY;

    return { 
      //add coinmarketcap key to server context
      cmcApiKey
    };
  }
});

//Start server
server.listen({port: PORT}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});