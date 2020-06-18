import { ApolloError } from "apollo-server";

const resolver = {
  Query: {
    getCurrencyQuote: async (parent, { input } , { dataSources }) => {
      try {
        // Retrieve the coinmarketcapAPI data source from the server context
        const { coinmarketcapAPI } = dataSources;

        // call the getCurrencyQuote method
        const response = await coinmarketcapAPI.getCurrencyQuote(input).catch((err) => {
          // catch any request errors 
          throw new ApolloError("couldn't get currency data", "500", {});
        });
        
        // traverse the quote JSON object to return all data that needs to be resolved
        const currencyData = Object.values(response.data).map((currency) => { return { currency: currency.symbol, price: currency.quote.USD.price } });
        return currencyData;
      } catch (err) {
        // catch any errors 
        throw new ApolloError("couldn't get currency data", "500", {});
      }
    },    
  },
  CryptoAssetData: {
    //Reference resolver - used by other services querying the CryptoAssetData type
    //Resover for 'Wallet' queries by currency Symbol
    async __resolveReference(reference, { dataSources }) {
      const { coinmarketcapAPI } = dataSources;
      const { currency, amount } = reference;
      const response = await coinmarketcapAPI.getCurrencyQuote(currency).catch((err) => {
        throw new ApolloError("couldn't get currency data", "500", {});
      });
      const { data } = response;
      const { [currency]: currencyData } = data;
      const { id, symbol, quote } = currencyData;
      const price = quote.USD.price;

      return { 
        id, 
        currency: symbol, 
        price,
        amount,
        value: amount * price
      };
    }
  }  
}

export default resolver;