import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';

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
  const [fiscalDateEnding, setFiscalDateEnding] = useState(null);
  const [inputChartData, setInputChartData] = useState(null);
  const [inputChartDataOptions, setInputChartDataOptions] = useState(null);
  const [inputChartDataSeries, setInputChartDataSeries] = useState(null);
  const [dataReceived, setDataReceived] = useState(null);

  const params = useParams();

  useEffect(() => {
    let path = `/company/${params.companyTicker}`;
    let grossProfit = [];
    let fiscalDateEnding = [];
    setDataFromAPI();
    API.get(apiName, path, requestVariables).then((response) => {
      console.log(response);
      response.quarterlyReports.map((quarterlyReport) => {
        //console.log(quarterlyReport.fiscalDateEnding);
        grossProfit.push(`${quarterlyReport.grossProfit / 1000000}M`);
        //grossProfit.push(quarterlyReport.grossProfit);
        fiscalDateEnding.push(quarterlyReport.fiscalDateEnding);
      });
      // Add your code here
      setDataFromAPI(response);

    setInputChartDataOptions({
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: fiscalDateEnding,
      },
    });
    setInputChartDataSeries([
      {
        name: 'series-1',
        data: grossProfit,
      },
    ])

    setDataReceived(true);
    

  
  
    })
    .catch((error) => {
      console.log(error.response);
    });
  
  }, []);

  return (
    <div>
      <h1>{params.companyTicker} Page</h1>
      <p>{params.companyTicker} Gross Profit (Coming from our API)</p>
      {dataReceived
        ? <Chart options={inputChartDataOptions} series={inputChartDataSeries} type="bar" width="500" />
        : <p>Loading...</p>
      }
      <p>{JSON.stringify(inputChartDataSeries)}</p>
      <p>{JSON.stringify(inputChartDataOptions)}</p>
    </div>
  );
};
export default Company;

