const https = require('https');

class TwelveDataRequestHandler {
  constructor(height, width) {
    this.area = height * width;
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
}

module.exports = TwelveDataRequestHandler;
