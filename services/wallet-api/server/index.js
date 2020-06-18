import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import resolvers from "./resolvers";
import typeDefs from './schema'; 

// Set port number
const { PORT = 5002 } = process.env;

// Initialize an Apollo Server instance
// Define the schema and resolvers for the federated service
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

//Start server
server.listen({port: PORT}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});