import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { CompanyNameLookup } from 'utils/CompanyNameLookup';
import RotateLoader from 'react-spinners/RotateLoader';
import NetIncomeChart from 'pages/charts/NetIncomeChart';
import RevenueChart from 'pages/charts/RevenueChart';
import MainCard from 'components/MainCard';
import RevenueParagraphGenerator from 'paragraph-generators/RevenueParagraphGenerator';
import { DateToQuarterFormatter } from 'utils/DateToQuarterFormatter';
import RevenueIconGenerator from 'icon-generator/RevenueIconGenerator';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const apiName = 'backstageinvestingapi';
const requestVariables = {
  headers: {},
  response: false,
  queryStringParameters: {
    name: 'param',
  },
};

const Company = () => {
  const [datesChart, setDatesChart] = useState(null);
  const [revenueValuesChart, setRevenueValuesChart] = useState(null);
  const [operatingExpensesValuesChart, setOperatingExpensesValuesChart] = useState(null);
  const [comprehensiveIncomeNetOfTax, setComprehensiveIncomeNetOfTax] = useState(null);
  const [costOfRevenue, setCostOfRevenue] = useState(null);
  const [netIncome, setNetIncome] = useState(null);
  const [dataReceived, setDataReceived] = useState(null);
  const [slot, setSlot] = useState('Last 2 Years');
  const [costofGoodsAndServicesSold, setCostofGoodsAndServicesSold] = useState('Last 2 Years');

  const params = useParams();

  useEffect(() => {
    let path = `/company/${params.companyTicker}`;
    let totalRevenue = [];
    let fiscalDateEnding = [];
    let operatingExpenses = [];
    let comprehensiveIncomeNetOfTax = [];
    let costOfRevenue = [];
    let costofGoodsAndServicesSold = [];
    let netIncome = [];
    setDataReceived(false);
    API.get(apiName, path, requestVariables)
      .then((response) => {
        console.log(response);
        response.quarterlyReports.forEach((quarterlyReport) => {
          totalRevenue.push(Math.round((quarterlyReport.totalRevenue / 1000000) * 10) / 10);
          operatingExpenses.push(Math.round((quarterlyReport.operatingExpenses / 1000000) * 10) / 10);
          comprehensiveIncomeNetOfTax.push(Math.round((quarterlyReport.comprehensiveIncomeNetOfTax / 1000000) * 10) / 10);
          costOfRevenue.push(Math.round((quarterlyReport.costOfRevenue / 1000000) * 10) / 10);
          costofGoodsAndServicesSold.push(Math.round((quarterlyReport.costofGoodsAndServicesSold / 1000000) * 10) / 10);
          netIncome.push(Math.round((quarterlyReport.netIncome / 1000000) * 10) / 10);
          fiscalDateEnding.push(DateToQuarterFormatter(quarterlyReport.fiscalDateEnding));
        });
        setDatesChart(fiscalDateEnding.reverse());
        setRevenueValuesChart(totalRevenue.reverse());
        setOperatingExpensesValuesChart(operatingExpenses.reverse());
        setComprehensiveIncomeNetOfTax(comprehensiveIncomeNetOfTax.reverse());
        setCostOfRevenue(costOfRevenue.reverse());
        setCostofGoodsAndServicesSold(costofGoodsAndServicesSold.reverse());
        setNetIncome(netIncome.reverse());
        setDataReceived(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useParams()]);

  return (
    <div>
      {dataReceived ? (
        <div>
          <Typography style={{ marginTop: 10 }} variant="h1">
            {CompanyNameLookup(params.companyTicker).name}
          </Typography>
          <Typography variant="subtitle" align="left" color="secondary">
            {params.companyTicker} - {CompanyNameLookup(params.companyTicker).exchange} - USD
          </Typography>
          {/*<Typography variant="body1" align="left">
            Status: Dumbster Fire 🗑️🔥 | Jim Cramer's Pick 🚨🔻 | Within Normal Range 🤷🏼‍♂️ | Strong Foundation 🏰
          </Typography>
          */}
          <Typography style={{ marginTop: 40 }} variant="h2">
            Is {CompanyNameLookup(params.companyTicker).name} Making Money?
          </Typography>
          <Grid item xs={12} md={7} lg={8} style={{ marginTop: 20 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h4">
                  Revenue & Cost of Revenue{' '}
                  <RevenueIconGenerator slot={slot} datesChart={datesChart} revenueValuesChart={revenueValuesChart} costOfRevenue={costOfRevenue} />
                </Typography>
              </Stack>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Button
                    size="small"
                    onClick={() => setSlot('All Time')}
                    color={slot === 'All Time' ? 'primary' : 'secondary'}
                    variant={slot === 'All Time' ? 'outlined' : 'text'}
                    startIcon={<AllInclusiveIcon />}
                  >
                    All Time
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot('Last 2 Years')}
                    color={slot === 'Last 2 Years' ? 'primary' : 'secondary'}
                    variant={slot === 'Last 2 Years' ? 'outlined' : 'text'}
                    startIcon={<CalendarMonthIcon />}
                  >
                    Last 2 Years
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <Typography variant="body1" style={{ marginTop: 10 }}>
              <RevenueParagraphGenerator
                companyName={CompanyNameLookup(params.companyTicker).name}
                companyTicker={params.companyTicker}
                slot={slot}
                datesChart={datesChart}
                revenueValuesChart={revenueValuesChart}
                costOfRevenue={costOfRevenue}
                //setRevenueInfoOpen={setRevenueInfoOpen}
              />{' '}
            </Typography>{' '}
            <MainCard content={false} sx={{ mt: 1.5 }}>
              <Box sx={{ pt: 1, pr: 2 }}>
                <RevenueChart
                  slot={slot}
                  datesChart={datesChart}
                  revenueValuesChart={revenueValuesChart}
                  operatingExpensesValuesChart={operatingExpensesValuesChart}
                  costOfRevenue={costOfRevenue}
                  costOfGoodsAndServicesSold={costofGoodsAndServicesSold}
                />
              </Box>
            </MainCard>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography style={{ marginTop: 50 }} variant="h4">
                  Net Income & Comprehensive Income Net of Tax
                </Typography>
                <Typography color="textSecondary" variant="">
                  Info on how this looks for {`${CompanyNameLookup(params.companyTicker).name}`}
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Button
                    size="small"
                    onClick={() => setSlot('All Time')}
                    color={slot === 'All Time' ? 'primary' : 'secondary'}
                    variant={slot === 'All Time' ? 'outlined' : 'text'}
                    startIcon={<AllInclusiveIcon />}
                  >
                    All Time
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot('Last 2 Years')}
                    color={slot === 'Last 2 Years' ? 'primary' : 'secondary'}
                    variant={slot === 'Last 2 Years' ? 'outlined' : 'text'}
                    startIcon={<CalendarMonthIcon />}
                  >
                    Last 2 Years
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <MainCard content={false} sx={{ mt: 1.5 }}>
              <Box sx={{ pt: 1, pr: 2 }}>
                <NetIncomeChart slot={slot} datesChart={datesChart} netIncome={netIncome} comprehensiveIncomeNetOfTax={comprehensiveIncomeNetOfTax} />
              </Box>
            </MainCard>
          </Grid>
          <Typography style={{ marginTop: 150 }} variant="h2">
            How is {CompanyNameLookup(params.companyTicker).name} Valued?
          </Typography>
          <p>This time, we are going to focus on the following metric to answer the question:</p>
          <li style={{ marginTop: 20 }}>
            <b style={{ color: '#009eea' }}>Price to Earnings Ratio</b> (P/E): Is a way to value a company by comparing the price of a stock to its
            earnings. The P/E equals the price of a share of stock, divided by the company's earnings-per-share. It tells you how much you are paying
            for each dollar of earnings.{' '}
          </li>
          <p style={{ marginBottom: 30 }}>Here's some of {`${CompanyNameLookup(params.companyTicker).name}`}'s recently reported data:</p>
          <p style={{ marginBottom: 30 }}>{`${CompanyNameLookup(params.companyTicker).name}`}'s stock price and revenue, charted togehter.</p>
          <p style={{ marginBottom: 30 }}>{`${CompanyNameLookup(params.companyTicker).name}`}'s stock PE, as well as other PE stocks also charted.</p>
        </div>
      ) : (
        <div>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '85vh' }}>
            <Grid item xs={7}>
              <RotateLoader color={'#009eea'} loading={true} size={15} aria-label="Loading Spinner" data-testid="loader" />{' '}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
export default Company;
