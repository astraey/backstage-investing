/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const https = require('https');

exports.handler = async (event) => {
  async function httpsCall() {
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
  //console.log(await httpsCall())
  //await httpsCall().then(console.log("Hey!!"))
  // httpsCall().then(resp => resp.json()).then(data => console.log(data))
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(await httpsCall()),
  };
};
