/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AlphaVantageRequestHandler = require('./request-handlers/AlphaVantageRequestHandler');
const alphaVantageRequestHandler = new AlphaVantageRequestHandler();
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};
exports.handler = async (event) => {
  console.log(event.resource);
  if (typeof event.resource !== 'undefined') {
    if (event.resource.includes('/company/')) {
      console.log("We are executing the original Company API Request");
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(await alphaVantageRequestHandler.getCompanyMetrics(event.pathParameters.proxy)),
      };
    }
    if (event.resource.includes('/yhcompany/')) {
      console.log("We are executing the new Yahoo Company API Request");
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          event: event || {},
          info: 'We are executing the new Yahoo Company API Request',
        }),
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
