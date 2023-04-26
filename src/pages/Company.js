import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const apiName = 'santamariaapi';
const requestVariables = {
  headers: {}, // OPTIONAL
  response: false, // OPTIONAL (if true, return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: 'param', // OPTIONAL
  },
};

const Company = () => {
  const [dataFromAPI, setDataFromAPI] = useState(null);
  const [grossProfit, setGrossProfit] = useState(null);
  const params = useParams();
  //const grossProfit = [];
  useEffect(() => {
    let path = `/company/${params.companyTicker}`;
    let grossProfit = [];
    setDataFromAPI();
    API.get(apiName, path, requestVariables)
      .then((response) => {
        response.quarterlyReports.map((quarterlyReport) => {
          //console.log(quarterlyReport.grossProfit);
          grossProfit.push(quarterlyReport.grossProfit)
        });
        // Add your code here
        console.log(grossProfit);
        console.log(response);
        setDataFromAPI(response);
        setGrossProfit(grossProfit);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <div>
      <h1>{params.companyTicker} Page</h1>
      <p>Company Data (Coming from our API)</p>
      <p>{JSON.stringify(grossProfit)}</p>
      <p>{JSON.stringify(dataFromAPI)}</p>
    </div>
  );
};
export default Company;
