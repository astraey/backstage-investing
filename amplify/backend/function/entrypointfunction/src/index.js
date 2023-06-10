/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AlphaVantageRequestHandler = require('./request-handlers/AlphaVantageRequestHandler');
const alphaVantageRequestHandler = new AlphaVantageRequestHandler();
const YHFinanceRequestHandler = require('./request-handlers/YHFinanceRequestHandler');
const yHFinanceRequestHandler = new YHFinanceRequestHandler();
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};
exports.handler = async (event) => {
  console.log(event.resource);
  if (typeof event.resource !== 'undefined') {
    if (event.resource.includes('/company/')) {
      console.log('We are using the AlphaVantage API');
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(await alphaVantageRequestHandler.getCompanyMetrics(event.pathParameters.proxy)),
      };
    }
    if (event.resource.includes('/yhcompany/')) {
      console.log('We are using the Yahoo Finance API');
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(await yHFinanceRequestHandler.getCompanyMetrics(event.pathParameters.proxy)),
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
