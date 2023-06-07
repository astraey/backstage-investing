//React & Amplify
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useParams } from 'react-router-dom';

//MUI
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

//Loader
import RotateLoader from 'react-spinners/RotateLoader';
import ClockLoader from 'react-spinners/ClockLoader';

//Charts
import RevenueChart from 'pages/charts/RevenueChart';
import ComprehensiveIncomeChart from 'pages/charts/ComprehensiveIncomeChart';

//Components
import MainCard from 'components/MainCard';

//Utils
import { CompanyNameLookup } from 'utils/CompanyNameLookup';
import { DateToQuarterFormatter } from 'utils/DateToQuarterFormatter';

//Paragraph Generators
import RevenueParagraphGenerator from 'paragraph-generators/RevenueParagraphGenerator';
import ComprehensiveIncomeParagraphGenerator from 'paragraph-generators/ComprehensiveIncomeParagraphGenerator';
import MakingMoneyParagraphGenerator from 'paragraph-generators/MakingMoneyParagraphGenerator';

//Icon Generators
import RevenueIconGenerator from 'icon-generator/RevenueIconGenerator';
import ComprehensiveIncomeIconGenerator from 'icon-generator/ComprehensiveIncomeIconGenerator';

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
  const [apiLimitReached, setApiLimitReached] = useState(false);

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
        if (response.hasOwnProperty('Note')) {
          if (response.Note.includes('Thank you for using Alpha Vantage')) {
            setApiLimitReached(true);
            setDataReceived(true);
          }
        } else {
          response.quarterlyReports.forEach((quarterlyReport) => {
            totalRevenue.push(Math.round((quarterlyReport.totalRevenue / 1000000) * 10) / 10);
            operatingExpenses.push(Math.round((quarterlyReport.operatingExpenses / 1000000) * 10) / 10);
            comprehensiveIncomeNetOfTax.push(Math.round((quarterlyReport.comprehensiveIncomeNetOfTax / 1000000) * 10) / 10);
            costOfRevenue.push(Math.abs(Math.round((quarterlyReport.costOfRevenue / 1000000) * 10) / 10));
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
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [params.companyTicker]);

  return (
    <div>
      {dataReceived ? (
        <span>
          {apiLimitReached ? (
            <div>
              <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '85vh' }}>
                <Grid container direction="column" justifyContent="space-between" alignItems="center">
                  <ClockLoader color={'#009eea'} loading={true} size={50} aria-label="Loading Spinner" data-testid="loader" />{' '}
                  <Typography variant="h5" style={{marginTop:30}}>Our system is receiving an unusually high number or requests.</Typography>
                  <Typography variant="body1">We could not fetch the financial information for {params.companyTicker}.</Typography>
                  <Typography variant="body1">Please try again in a few minutes.</Typography>
                </Grid>
              </Grid>
            </div>
          ) : (
            <span>
              <Typography style={{ marginTop: 10 }} variant="h1">
                {CompanyNameLookup(params.companyTicker).name}
              </Typography>
              <Typography variant="subtitle" align="left" color="secondary">
                {params.companyTicker} - {CompanyNameLookup(params.companyTicker).exchange} - USD
              </Typography>
              <Typography style={{ marginTop: 40 }} variant="h2">
                Is {CompanyNameLookup(params.companyTicker).name} Making Money?
              </Typography>
              <Typography variant="body1">
                <MakingMoneyParagraphGenerator
                  companyName={CompanyNameLookup(params.companyTicker).name}
                  companyTicker={params.companyTicker}
                  comprehensiveIncomeNet={comprehensiveIncomeNetOfTax}

                  //setRevenueInfoOpen={setRevenueInfoOpen}
                />{' '}
              </Typography>
              <Grid item xs={12} md={7} lg={8} style={{ marginTop: 40 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h4">
                      Revenue & Cost of Revenue{' '}
                      <RevenueIconGenerator
                        slot={slot}
                        datesChart={datesChart}
                        revenueValuesChart={revenueValuesChart}
                        costOfRevenue={costOfRevenue}
                      />
                    </Typography>
                  </Stack>
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={0} style={{ margin: 8 }}>
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
                  <Typography variant="body1">
                    <RevenueParagraphGenerator
                      companyName={CompanyNameLookup(params.companyTicker).name}
                      companyTicker={params.companyTicker}
                      slot={slot}
                      datesChart={datesChart}
                      revenueValuesChart={revenueValuesChart}
                      costOfRevenue={costOfRevenue}
                      //setRevenueInfoOpen={setRevenueInfoOpen}
                    />
                  </Typography>
                </Grid>
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
                <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: 40 }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="h4">
                      Comprehensive Income Net of Tax{' '}
                      <ComprehensiveIncomeIconGenerator
                        slot={slot}
                        datesChart={datesChart}
                        revenueValuesChart={revenueValuesChart}
                        costOfRevenue={costOfRevenue}
                        comprehensiveIncomeNetOfTax={comprehensiveIncomeNetOfTax}
                      />
                    </Typography>
                  </Stack>
                  <Grid item>
                    <Stack direction="row" alignItems="center" spacing={0} style={{ margin: 8 }}>
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
                  <Typography variant="body1">
                    <ComprehensiveIncomeParagraphGenerator
                      companyName={CompanyNameLookup(params.companyTicker).name}
                      companyTicker={params.companyTicker}
                      slot={slot}
                      datesChart={datesChart}
                      revenueValuesChart={revenueValuesChart}
                      comprehensiveIncomeNetOfTax={comprehensiveIncomeNetOfTax}
                      costOfRevenue={costOfRevenue}
                    />
                  </Typography>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                  <Box sx={{ pt: 1, pr: 2 }}>
                    <ComprehensiveIncomeChart
                      slot={slot}
                      datesChart={datesChart}
                      netIncome={netIncome}
                      comprehensiveIncomeNetOfTax={comprehensiveIncomeNetOfTax}
                    />
                  </Box>
                </MainCard>
              </Grid>
              <Typography style={{ marginTop: 150 }} variant="h2">
                How is {CompanyNameLookup(params.companyTicker).name} Valued?
              </Typography>
              <p>This time, we are going to focus on the following metric to answer the question:</p>
              <li style={{ marginTop: 20 }}>
                <b style={{ color: '#009eea' }}>Price to Earnings Ratio</b> (P/E): Is a way to value a company by comparing the price of a stock to
                its earnings. The P/E equals the price of a share of stock, divided by the company's earnings-per-share. It tells you how much you are
                paying for each dollar of earnings.{' '}
              </li>
              <p style={{ marginBottom: 30 }}>Here's some of {`${CompanyNameLookup(params.companyTicker).name}`}'s recently reported data:</p>
              <p style={{ marginBottom: 30 }}>{`${CompanyNameLookup(params.companyTicker).name}`}'s stock price and revenue, charted togehter.</p>
              <p style={{ marginBottom: 30 }}>
                {`${CompanyNameLookup(params.companyTicker).name}`}'s stock PE, as well as other PE stocks also charted.
              </p>
            </span>
          )}
        </span>
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
