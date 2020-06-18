import { RESTDataSource } from "apollo-datasource-rest";

export class CoinmarketcapAPI extends RESTDataSource {
  constructor() {
    super();
  }

  // A getter that sets the base URL for all requests
  get baseURL() {
    return 'https://pro-api.coinmarketcap.com/v1';
  }

  // GET a single currency quote by passing the currency 'symbol'
  async getCurrencyQuote(currency) {
    return this.get(`/cryptocurrency/quotes/latest?&convert=USD&symbol=${currency}`,{},
    { headers: {
      //Retrieve coinmarketcap api key from context
      // set the X-CMC_PRO_API_KEY header for this request
      'X-CMC_PRO_API_KEY': `${this.context.cmcApiKey}`,
    },
    });
  }
}
