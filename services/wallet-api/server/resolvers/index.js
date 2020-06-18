//import wallets data
import { wallets } from '../models';

//Define resolvers
export default {
  Query: {
    getWallets: async (parent) => {
      return wallets;
    },
    getWalletById: async (parent, { walletId }) => {
      const walletById = wallets.find((wallet) => wallet.walletId === walletId);
      return walletById;
    }
  },
  Wallet: {
    // Our wallet schema contains the 'User' entity extended from the User service
    // To resolve user type, we send a wallet ID reference to find the owner of the wallet
    user(reference) {
      //'reference' contains wallet information including the wallet ID
      const { walletId } = reference;
      return { __typename: "User", walletId };
    },

    // Our wallet schema contains the 'CryptoAssetData' entity extended from the cryptocurrency service
    // To resolve the 'CryptoAssetData' type, we send a currency symbol reference to the cryptocurrency service
    assets(reference) {
      //'reference' contains wallet information including user's crypto assets
      const { assets } = reference;
      // As we're resolving a list of assets, we send our reference as a list
      const assetList = assets.map((asset) => { 
        const { currency, balance } = asset;
        const { amount } = balance;
        return { 
        __typename: "CryptoAssetData", 
        currency: currency,
        amount
      } 
    });
      return assetList;
    },    

  }
};