import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

const apiName = 'santamariaapi';
const path = '/company/AMZN';
const requestVariables = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: 'param', // OPTIONAL
  },
};

const Company = () => {
  const [dataFromAPI, setDataFromAPI] = useState(null);
  useEffect(() => {
    setDataFromAPI();
    API.get(apiName, path, requestVariables)
      .then((response) => {
        // Add your code here
        console.log(response);
        setDataFromAPI(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <div>
      <h1>AMZN Page</h1>
      <p>Company Data (Coming from our API)</p>
      <p>{JSON.stringify(dataFromAPI)}</p>
    </div>
  );
};
export default Company;
