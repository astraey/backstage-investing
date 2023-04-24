const https = require('https');
const aws = require('aws-sdk');

class TwelveDataRequestHandler {
  constructor() {
    this.apiKey = new aws.SSM()
      .getParameters({
        Names: ['twelvedataapikey'].map((secretName) => process.env[secretName]),
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

  async getCompanyMetrics(stockTicker) {
    let apiKey;
    await this.apiKey.then(function (result) {
      apiKey = result.Parameters[0].Value;
    });
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        hostname: 'api.twelvedata.com',
        port: null,
        path: `/statistics?symbol=${stockTicker}&apikey=${apiKey}`,
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

      req.write('');
      req.end();
    });
  }
}

module.exports = TwelveDataRequestHandler;
