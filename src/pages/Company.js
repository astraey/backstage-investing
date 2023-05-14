import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { CompanyNameLookup } from 'utils/CompanyNameLookup';
import RotateLoader from 'react-spinners/RotateLoader';
import ComprehensiveIncomeChart from 'pages/charts/ComprehensiveIncomeChart';
import AnalyticCard from 'pages/charts/AnalyticCard';
import RevenueChart from 'pages/charts/RevenueChart';
import MainCard from 'components/MainCard';
import RevenueParagraphGenerator from 'paragraph-generators/RevenueParagraphGenerator';

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
  const [comprehensiveIncomeNetOfTaxLastReportedQuarter, setComprehensiveIncomeNetOfTaxLastReportedQuarter] = useState(null);
  const [revenueLastReportedQuarter, setRevenueLastReportedQuarter] = useState(null);
  const [revenueInfoOpen, setRevenueInfoOpen] = useState(false);
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
          let monthDay = `${quarterlyReport.fiscalDateEnding.split('-')[1]}-${quarterlyReport.fiscalDateEnding.split('-')[2]}`;
          if (monthDay === '03-31') {
            fiscalDateEnding.push(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '04-30') {
            fiscalDateEnding.push(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '06-30') {
            fiscalDateEnding.push(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '07-31') {
            fiscalDateEnding.push(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '09-30') {
            fiscalDateEnding.push(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '10-31') {
            fiscalDateEnding.push(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '12-31') {
            fiscalDateEnding.push(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '01-31') {
            fiscalDateEnding.push(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0] - 1}`);
          } else {
            fiscalDateEnding.push('Quarter Unknown');
          }
        });
        setDatesChart(fiscalDateEnding.reverse());
        setRevenueValuesChart(totalRevenue.reverse());
        setOperatingExpensesValuesChart(operatingExpenses.reverse());
        setComprehensiveIncomeNetOfTax(comprehensiveIncomeNetOfTax.reverse());
        setCostOfRevenue(costOfRevenue.reverse());
        setCostofGoodsAndServicesSold(costofGoodsAndServicesSold.reverse());

        setComprehensiveIncomeNetOfTaxLastReportedQuarter({
          reportedQuarter: fiscalDateEnding[fiscalDateEnding.length - 1],
          comprehensiveIncomeNetOfTax: comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1],
          comprehensiveIncomeNetOfTaxFormatted:
            comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1] < 1000 &&
            comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1] > -1000
              ? `$${comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1]}M`
              : `$${Math.round((comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1] / 1000) * 10) / 10}B`,
          percentageChange: Math.round(
            ((comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1] -
              comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 2]) /
              Math.abs(comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 1])) *
              100,
          ),
          percentageChangeQuarter: fiscalDateEnding[fiscalDateEnding.length - 2],
          comprehensiveIncomeNetOfTaxPreviousQuarter: comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 2],
          comprehensiveIncomeNetOfTaxPreviousQuarterFormatted:
            comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 2] < 1000 &&
            comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 2] > -1000
              ? `$${comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 2]}M`
              : `$${Math.round((comprehensiveIncomeNetOfTax[comprehensiveIncomeNetOfTax.length - 2] / 1000) * 10) / 10}B`,
        });
        setRevenueLastReportedQuarter({
          reportedQuarter: fiscalDateEnding[fiscalDateEnding.length - 1],
          totalRevenue: totalRevenue[totalRevenue.length - 1],
          revenueFormatted:
            totalRevenue[totalRevenue.length - 1] < 1000 && totalRevenue[totalRevenue.length - 1] > -1000
              ? `$${totalRevenue[totalRevenue.length - 1]}M`
              : `$${Math.round((totalRevenue[totalRevenue.length - 1] / 1000) * 10) / 10}B`,
          percentageChange: Math.round(
            ((totalRevenue[totalRevenue.length - 1] - totalRevenue[totalRevenue.length - 2]) / Math.abs(totalRevenue[totalRevenue.length - 1])) * 100,
          ),
          percentageChangeQuarter: fiscalDateEnding[fiscalDateEnding.length - 2],
          revenueLastReportedQuarter: totalRevenue[totalRevenue.length - 2],
          revenuePreviousQuarterFormatted:
            totalRevenue[totalRevenue.length - 2] < 1000 && totalRevenue[totalRevenue.length - 2] > -1000
              ? `$${totalRevenue[totalRevenue.length - 2]}M`
              : `$${Math.round((totalRevenue[totalRevenue.length - 2] / 1000) * 10) / 10}B`,
        });
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
          <h1>
            <span>
              {CompanyNameLookup(params.companyTicker)}
              <Typography variant="caption" color="secondary">{` ${params.companyTicker}`}</Typography>
            </span>
          </h1>
          <br></br>
          <h2>Is {params.companyTicker} Making Money?</h2>
          <p>Very short executive summary here. A couple sentences max.</p>

          <div>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <AnalyticCard
                  title={`${revenueLastReportedQuarter.reportedQuarter} Revenue`}
                  metricName={'revenue'}
                  count={revenueLastReportedQuarter.totalRevenue}
                  countFormatted={revenueLastReportedQuarter.revenueFormatted}
                  companyTicker={params.companyTicker}
                  companyName={CompanyNameLookup(params.companyTicker)}
                  quarter={revenueLastReportedQuarter.reportedQuarter}
                  percentageChange={revenueLastReportedQuarter.percentageChange}
                  percentageChangeQuarter={revenueLastReportedQuarter.percentageChangeQuarter}
                  countPreviousQuarter={revenueLastReportedQuarter.revenueLastReportedQuarter}
                  countPreviousQuarterFormatted={revenueLastReportedQuarter.revenuePreviousQuarterFormatted}
                />{' '}
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}>
                <AnalyticCard
                  title={`${comprehensiveIncomeNetOfTaxLastReportedQuarter.reportedQuarter} Comprehensive Net Income`}
                  metricName={'comprehensive net income'}
                  count={comprehensiveIncomeNetOfTaxLastReportedQuarter.comprehensiveIncomeNetOfTax}
                  countFormatted={comprehensiveIncomeNetOfTaxLastReportedQuarter.comprehensiveIncomeNetOfTaxFormatted}
                  companyTicker={params.companyTicker}
                  companyName={CompanyNameLookup(params.companyTicker)}
                  quarter={comprehensiveIncomeNetOfTaxLastReportedQuarter.reportedQuarter}
                  percentageChange={comprehensiveIncomeNetOfTaxLastReportedQuarter.percentageChange}
                  percentageChangeQuarter={comprehensiveIncomeNetOfTaxLastReportedQuarter.percentageChangeQuarter}
                  countPreviousQuarter={comprehensiveIncomeNetOfTaxLastReportedQuarter.comprehensiveIncomeNetOfTaxPreviousQuarter}
                  countPreviousQuarterFormatted={comprehensiveIncomeNetOfTaxLastReportedQuarter.comprehensiveIncomeNetOfTaxPreviousQuarterFormatted}
                />
              </Grid>
              {/*
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticCard title="Total Users" count="78250" percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticCard title="Total Order" count="18800" percentage={27.4} extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticCard title="Total Sales" count="35078" percentage={27.4} extra="$20,395" />
            </Grid>
            */}
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12} md={7} lg={8}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <h2>
                    <span>
                      <span>Revenue & Cost of Revenue</span>
                      <Typography variant="caption" color="secondary">
                        {' '}
                        <Button size="small" onClick={() => setRevenueInfoOpen(true)} color="secondary" variant={'text'}>
                          How do these look for {params.companyTicker}?
                        </Button>
                      </Typography>
                    </span>
                  </h2>
                </Grid>
                <Grid item>
                  <Stack direction="row" alignItems="center" spacing={0}>
                    <Button
                      size="small"
                      onClick={() => setSlot('All Time')}
                      color={slot === 'All Time' ? 'primary' : 'secondary'}
                      variant={slot === 'All Time' ? 'outlined' : 'text'}
                    >
                      All Time
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setSlot('Last 2 Years')}
                      color={slot === 'Last 2 Years' ? 'primary' : 'secondary'}
                      variant={slot === 'Last 2 Years' ? 'outlined' : 'text'}
                    >
                      Last 2 Years
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              <Typography color="textSecondary" variant="">
                <p>
                  <strong>Revenue</strong> is the money a company earns from selling products or services, before deducting any expenses, such as the
                  cost of raw materials, employee salaries, taxes, etc. <strong>Cost of Revenue</strong> is the total cost of manufacturing and
                  delivering a product or service to consumers.
                </p>
                {revenueInfoOpen ? (
                  <RevenueParagraphGenerator
                    companyName={CompanyNameLookup(params.companyTicker)}
                    companyTicker={params.companyTicker}
                    slot={slot}
                    datesChart={datesChart}
                    revenueValuesChart={revenueValuesChart}
                    costOfRevenue={costOfRevenue}
                    setRevenueInfoOpen={setRevenueInfoOpen}
                  />
                ) : (
                  <span></span>
                )}
              </Typography>
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
              <br></br>
              <br></br>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">Comprehensive Income Net Of Tax</Typography>
                  <Typography color="textSecondary" variant="">
                    Comprehensive income is the total profit or gain that a company makes in a particular period of time, plus the value of yet
                    unrealized profits (or losses) in the same period.
                  </Typography>
                </Grid>
              </Grid>
              <MainCard content={false} sx={{ mt: 1.5 }}>
                <Box sx={{ pt: 1, pr: 2 }}>
                  <ComprehensiveIncomeChart slot={slot} datesChart={datesChart} comprehensiveIncomeNetOfTax={comprehensiveIncomeNetOfTax} />
                </Box>
              </MainCard>
            </Grid>
          </div>
        </div>
      ) : (
        <div>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '60vh' }}>
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
