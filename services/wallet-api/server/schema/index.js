import { gql } from 'apollo-server';

export default gql`

# We extend the User type from the User service.
# Our gateway only needs a reference to the Type via primary key
# to enable ALL user data to be resolved.
extend type User @key(fields: "walletId") {
  walletId: String @external
  }

# We extend the CryptoAssetData type from the Cryptocurrency service.
# Our gateway only needs a reference to the CryptoAssetData Type via the "currency" primary key
# to enable ALL currency data to be resolved
extend type CryptoAssetData @key(fields: "currency amount") {
  currency: String @external
  amount: String @external
}


type Wallet {
  walletId: ID!
  user: User
  assets: [CryptoAssetData]
}

type Query {
  getWallets: [Wallet]
  getWalletById(walletId: ID): Wallet
}
  
`;