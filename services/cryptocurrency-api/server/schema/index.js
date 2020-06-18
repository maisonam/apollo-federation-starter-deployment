import { gql } from 'apollo-server';

export default gql`

# CryptoAssetData type definition is an Entity to be shared with multiple services
# The @key directive defines the entity's primary key
# This primary key will be used as a unique reference for all implementing services
type CryptoAssetData @key(fields: "currency amount") {
  id: ID!
  currency: String
  price: Float
  amount: String
  value: String
}

type Query {
  getCurrencyQuote(input: String): [CryptoAssetData]
}
  
`;