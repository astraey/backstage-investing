/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const TwelveDataRequestHandler = require('./twelvedatarequesthandler');
const twelveDataRequestHandler = new TwelveDataRequestHandler();

exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(await twelveDataRequestHandler.getChuckNorrisJoke()),
  };
};
