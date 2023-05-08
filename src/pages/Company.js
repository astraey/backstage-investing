import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

/*
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
*/

// project import
//import OrdersTable from 'pages/dashboard/OrdersTable';
//import IncomeAreaChart from 'pages/dashboard/IncomeAreaChart';
//import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';
//import ReportAreaChart from 'pages/dashboard/ReportAreaChart';
//import SalesColumnChart from 'pages/dashboard/SalesColumnChart';
import MainCard from 'components/MainCard';
import SimplePopover from 'components/SimplePopover';
//import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import RevenueChart from 'pages/charts/RevenueChart';
import ComprehensiveIncomeChart from 'pages/charts/ComprehensiveIncomeChart';
import AnalyticCard from 'pages/charts/AnalyticCard';

// assets
import { SyncOutlined } from '@ant-design/icons';
/*
import { GiftOutlined, MessageOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
*/

const stocks = require('stock-ticker-symbol');

const apiName = 'backstageinvestingapi';
const requestVariables = {
  headers: {}, // OPTIONAL
  response: false, // OPTIONAL (if true, return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: 'param', // OPTIONAL
  },
};

/*
// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem',
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none',
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'year',
    label: 'This Year',
  },
];
*/

const Company = () => {
  const [datesChart, setDatesChart] = useState(null);
  const [revenueValuesChart, setRevenueValuesChart] = useState(null);
  const [operatingExpensesValuesChart, setOperatingExpensesValuesChart] = useState(null);
  const [comprehensiveIncomeNetOfTax, setComprehensiveIncomeNetOfTax] = useState(null);
  const [costOfRevenue, setCostOfRevenue] = useState(null);
  const [comprehensiveIncomeNetOfTaxLastReportedQuarter, setComprehensiveIncomeNetOfTaxLastReportedQuarter] = useState(null);
  const [revenueLastReportedQuarter, setRevenueLastReportedQuarter] = useState(null);
  const [dataReceived, setDataReceived] = useState(null);
  //const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('Last 2 Years');
  const [costofGoodsAndServicesSold, setCostofGoodsAndServicesSold] = useState('Last 2 Years');

  const params = useParams();
  const theme = useTheme();

  useEffect(() => {
    let path = `/company/${params.companyTicker}`;
    let totalRevenue = [];
    let fiscalDateEnding = [];
    let operatingExpenses = [];
    let comprehensiveIncomeNetOfTax = [];
    let costOfRevenue = [];
    let costofGoodsAndServicesSold = [];
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
          console.log(quarterlyReport.fiscalDateEnding);
          if (monthDay === '03-31') {
            fiscalDateEnding.push(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '04-30') {
            fiscalDateEnding.push(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '06-30') {
            fiscalDateEnding.push(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '07-31') {
            fiscalDateEnding.push(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '09-30') {
            fiscalDateEnding.push(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '10-31') {
            fiscalDateEnding.push(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '12-31') {
            fiscalDateEnding.push(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
            console.log(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
          } else if (monthDay === '01-31') {
            fiscalDateEnding.push(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0] - 1}`);
            console.log(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
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
      <h1>
        {stocks.lookup(params.companyTicker) ? (
          <span>
            {' '}
            {`${stocks.lookup(params.companyTicker)}`}
            <Typography variant="caption" color="secondary">{` ${params.companyTicker}`}</Typography>
          </span>
        ) : (
          <span>{params.companyTicker}</span>
        )}
      </h1>
      {dataReceived ? (
        <div>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <AnalyticCard
                title={`${revenueLastReportedQuarter.reportedQuarter} Revenue`}
                count={revenueLastReportedQuarter.totalRevenue}
                countFormatted={revenueLastReportedQuarter.revenueFormatted}
                companyTicker={params.companyTicker}
                companyName={stocks.lookup(params.companyTicker)}
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
                count={comprehensiveIncomeNetOfTaxLastReportedQuarter.comprehensiveIncomeNetOfTax}
                countFormatted={comprehensiveIncomeNetOfTaxLastReportedQuarter.comprehensiveIncomeNetOfTaxFormatted}
                companyTicker={params.companyTicker}
                companyName={stocks.lookup(params.companyTicker)}
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
                <Typography variant="h4">Revenue & Cost of Revenue</Typography>
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
            <br></br>
            <Typography color="textSecondary" variant="">
              Revenue is the total amount of money a business earns from selling its products or services. In other words, revenue is the income a
              company generates from its primary operations before deducting expenses such as the cost of goods sold, taxes, and other business
              expenses. It is essentially the money that flows into a business from its customers or clients.
            </Typography>
            <br></br>
            <SimplePopover
              buttonTitle="Why is Revenue Important?"
              content="Revenue refers to the total amount of money that a company earns from its sales of goods or services over a specific period. It is the
                    top line of a company's income statement, which represents the company's total sales or turnover. Revenue is calculated by multiplying
                    the price of a product or service by the quantity sold. Cost of revenue, also known as cost of goods sold (COGS), refers to the direct
                    costs associated with producing or delivering a company's goods or services. This includes the cost of raw materials, labor,
                    manufacturing overhead, shipping, and any other expenses directly related to producing or delivering a product or service. To calculate
                    the gross profit of a company, which is the revenue minus the cost of revenue, the cost of revenue is deducted from the revenue. The
                    gross profit reflects how much revenue a company retains after accounting for the direct costs of producing its goods or services.
                    Revenue and cost of revenue are important financial metrics that can help investors and analysts assess a company's financial
                    performance and profitability. A high revenue figure combined with a low cost of revenue can indicate that a company is generating
                    significant profits and is efficiently managing its costs. On the other hand, a low revenue figure combined with a high cost of revenue
                    can indicate that a company is struggling to generate profits and may need to find ways to reduce its costs or increase its revenue."
            />
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
                <br></br>
                <SimplePopover
                  buttonTitle="Why is Comprehensive Net of Tax important?"
                  content="Comprehensive net of tax refers to a financial statement that includes all of a company's financial transactions and their effects on its overall financial position, taking into account the impact of taxes. This statement provides a comprehensive view of a company's financial performance by combining its income statement, balance sheet, and other financial information, and adjusting for the effects of taxes. It takes into account all sources of income and expenses, including those that are not directly related to the company's core business operations. The net of tax aspect refers to the fact that the statement takes into account the impact of taxes on the company's financial position. This means that the statement includes both pre-tax and after-tax figures, allowing investors and analysts to assess the company's financial performance on a more complete and accurate basis. Overall, the comprehensive net of tax statement provides a comprehensive view of a company's financial position that takes into account all relevant financial transactions and their impact on the company's overall financial health."
                />
              </Grid>
            </Grid>
            <MainCard content={false} sx={{ mt: 1.5 }}>
              <Box sx={{ pt: 1, pr: 2 }}>
                <ComprehensiveIncomeChart slot={slot} datesChart={datesChart} comprehensiveIncomeNetOfTax={comprehensiveIncomeNetOfTax} />
              </Box>
            </MainCard>
          </Grid>
        </div>
      ) : (
        <div>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '60vh' }}>
            <Grid item xs={7}>
              <SyncOutlined spin style={{ fontSize: '1000%', color: theme.palette.primary.light }} />
            </Grid>
          </Grid>
        </div>
      )}

      {/*Samples From Dashboard Page Start Here*/}
      {/*
      <br></br>
      <br></br>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard Samples</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Unique Visitor</Typography>
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
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <IncomeAreaChart slot={slot} />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="textSecondary">
                  This Week Statistics
                </Typography>
                <Typography variant="h3">$7,650</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Orders</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Analytics Report</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Company Finance Growth" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Company Expenses Ratio" />
                <Typography variant="h5">0.58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Business Risk Cases" />
                <Typography variant="h5">Low</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Sales Report</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                size="small"
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' },
                }}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 1.75 }}>
            <Stack spacing={1.5} sx={{ mb: -12 }}>
              <Typography variant="h6" color="secondary">
                Net Profit
              </Typography>
              <Typography variant="h4">$1560</Typography>
            </Stack>
            <SalesColumnChart />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Transaction History</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                '& .MuiListItemButton-root': {
                  py: 1.5,
                  '& .MuiAvatar-root': avatarSX,
                  '& .MuiListItemSecondaryAction-root': {
                    ...actionSX,
                    position: 'relative',
                  },
                },
              }}
            >
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'success.main',
                      bgcolor: 'success.lighter',
                    }}
                  >
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $1,430
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      78%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'primary.main',
                      bgcolor: 'primary.lighter',
                    }}
                  >
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">Order #984947</Typography>}
                  secondary="5 August, 1:45 PM"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $302
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      8%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      color: 'error.main',
                      bgcolor: 'error.lighter',
                    }}
                  >
                    <SettingOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $682
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      16%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack>
                    <Typography variant="h5" noWrap>
                      Help & Support Chat
                    </Typography>
                    <Typography variant="caption" color="secondary" noWrap>
                      Typical replay within 5 min
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    <Avatar alt="Remy Sharp" src={avatar1} />
                    <Avatar alt="Travis Howard" src={avatar2} />
                    <Avatar alt="Cindy Baker" src={avatar3} />
                    <Avatar alt="Agnes Walker" src={avatar4} />
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                Need Help?
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
      */}
    </div>
  );
};
export default Company;
