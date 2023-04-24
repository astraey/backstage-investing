/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

//const TwelveDataRequestHandler = require('./request-handlers/TwelveDataRequestHandler');
//const twelveDataRequestHandler = new TwelveDataRequestHandler();

const AlphaVantageRequestHandler = require('./request-handlers/AlphaVantageRequestHandler');
const alphaVantageRequestHandler = new AlphaVantageRequestHandler();
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};
exports.handler = async (event) => {
  if (typeof event.resource !== 'undefined') {
    switch (true) {
      case event.resource.includes('company'):
        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify(await alphaVantageRequestHandler.getCompanyMetrics(event.pathParameters.proxy)),
        };
    }
  } else {
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        event: event || {},
        info: 'The path is the request is not mapped in our API',
      }),
    };
  }
};
