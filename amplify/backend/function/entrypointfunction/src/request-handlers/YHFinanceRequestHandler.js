const https = require('https');
const aws = require('aws-sdk');
var yahooFinance = require('yahoo-finance');

class YHFinanceRequestHandler {
  constructor() {
    this.apiKey = new aws.SSM()
      .getParameters({
        Names: ['alphavantageapikey'].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
  }
  async getChuckNorrisJoke() {
    return new Promise((resolve, reject) => {
      const options = {
        host: 'api.chucknorris.io',
        path: '/jokes/random',
        port: 443,
        method: 'GET',
      };

      const req = https.request(options, (res) => {
        var body = '';

        res.on('data', function (chunk) {
          body += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(body));
        });
      });

      req.on('error', (e) => {
        reject(e.message);
      });

      // send the request
      req.write('');
      req.end();
    });
  }

  //https://github.com/pilwon/node-yahoo-finance/blob/HEAD/docs/quote.md
  async getCompanyMetrics(stockTicker) {
    return new Promise((resolve, reject) => {
      yahooFinance.quote(
        {
          symbol: stockTicker,
          modules: ['price', 'summaryDetail'],
        },
        function (err, quotes) {
          if (err) {
            console.log('Error:', err);
          } else {
            console.log(quotes);
            resolve(quotes);
          }
        },
      );
    });
  }
}

module.exports = YHFinanceRequestHandler;
