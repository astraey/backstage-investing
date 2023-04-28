import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import Chart from 'react-apexcharts';

// material-ui
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
  Typography
} from '@mui/material';

// project import
import OrdersTable from 'pages/dashboard/OrdersTable';
import IncomeAreaChart from 'pages/dashboard/IncomeAreaChart';
import MonthlyBarChart from 'pages/dashboard/MonthlyBarChart';
import ReportAreaChart from 'pages/dashboard/ReportAreaChart';
import SalesColumnChart from 'pages/dashboard/SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import RevenueChart from 'pages/RevenueChart.js';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

const apiName = 'santamariaapi';
const requestVariables = {
  headers: {}, // OPTIONAL
  response: false, // OPTIONAL (if true, return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: 'param', // OPTIONAL
  },
};

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

const Company = () => {
  const [dataFromAPI, setDataFromAPI] = useState(null);
  //const [grossProfit, setGrossProfit] = useState(null);
  //const [fiscalDateEnding, setFiscalDateEnding] = useState(null);
  //const [inputChartData, setInputChartData] = useState(null);
  const [datesChart, setDatesChart] = useState(null);
  const [revenueValuesChart, setRevenueValuesChart] = useState(null);
  const [operatingExpensesValuesChart, SetOperatingExpensesValuesChart] = useState(null);
  const [dataReceived, setDataReceived] = useState(null);
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('Last 7 Quarters');

  const params = useParams();

  useEffect(() => {
    let path = `/company/${params.companyTicker}`;
    let grossProfit = [];
    let fiscalDateEnding = [];
    let operatingExpenses = [];
    setDataFromAPI();
    API.get(apiName, path, requestVariables)
      .then((response) => {
        console.log(response);
        response.quarterlyReports.map((quarterlyReport) => {
          grossProfit.push(`${quarterlyReport.grossProfit / 1000000}M`);
          operatingExpenses.push(`${quarterlyReport.operatingExpenses / 1000000}M`);
          switch (
            `${quarterlyReport.fiscalDateEnding.split('-')[1]}-${quarterlyReport.fiscalDateEnding.split('-')[2]}`
          ) {
            case '03-31':
              fiscalDateEnding.push(`Q1 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
              break;
            case '06-30':
              fiscalDateEnding.push(`Q2 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
              break;
            case '09-30':
              fiscalDateEnding.push(`Q3 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
              break;
            case '12-31':
              fiscalDateEnding.push(`Q4 ${quarterlyReport.fiscalDateEnding.split('-')[0]}`);
              break;
          }
        });

        setDataFromAPI(response);

        setDatesChart(fiscalDateEnding);
        setRevenueValuesChart(grossProfit);
        SetOperatingExpensesValuesChart(operatingExpenses);

        setDataReceived(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div>
      <h1>{params.companyTicker} Page</h1>
      {/*<p>{JSON.stringify(revenueValuesChart)}</p>*/}
      {/*<p>{JSON.stringify(datesChart)}</p>*/}
      {dataReceived ? (
        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Revenue</Typography>
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
                  onClick={() => setSlot('Last 7 Quarters')}
                  color={slot === 'Last 7 Quarters' ? 'primary' : 'secondary'}
                  variant={slot === 'Last 7 Quarters' ? 'outlined' : 'text'}
                >
                  Last 7 Quarters
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <RevenueChart
                slot={slot}
                datesChart={datesChart}
                revenueValuesChart={revenueValuesChart}
                operatingExpensesValuesChart={operatingExpensesValuesChart}
              />
            </Box>
          </MainCard>
        </Grid>
      ) : (
        <p><SyncOutlined spin style={{ fontSize: '300%' }} /></p>
      )}
      {/*
      {dataReceived ? (
        <Chart options={inputChartDataOptions} series={inputChartDataSeries} type="bar" width="500" />
      ) : (
        <p>Loading...</p>
      )}
      */}

      {/*Samples From Dashboard Page Start Here*/}
      <br></br>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
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
          <AnalyticEcommerce
            title="Total Order"
            count="18,800"
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales"
            count="$35,078"
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        {/* row 2 */}
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
                  onClick={() => setSlot('Last 7 Quarters')}
                  color={slot === 'Last 7 Quarters' ? 'primary' : 'secondary'}
                  variant={slot === 'Last 7 Quarters' ? 'outlined' : 'text'}
                >
                  Last 7 Quarters
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

        {/* row 3 */}
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

        {/* row 4 */}
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
                <ListItemText
                  primary={<Typography variant="subtitle1">Order #002434</Typography>}
                  secondary="Today, 2:00 AM"
                />
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
                <ListItemText
                  primary={<Typography variant="subtitle1">Order #988784</Typography>}
                  secondary="7 hours ago"
                />
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
    </div>
  );
};
export default Company;