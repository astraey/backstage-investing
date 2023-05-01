import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
    formatter(val) {
      let isNegative = false;
      if (val < 0) {
        isNegative = true;
        val = Math.abs(val);
      }
    
      if (val < 1000) {
        return isNegative ? `-$${val}M` : `$${val}M`;
      } else {
        return isNegative ? `-$${Math.round((val / 1000) * 10) / 10}B` : `$${Math.round((val / 1000) * 10) / 10}B`;
      }
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

// ==============================|| INCOME AREA CHART ||============================== //

const RevenueChart = ({ slot, datesChart, revenueValuesChart, operatingExpensesValuesChart, costOfRevenue }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary[200], theme.palette.error.light, theme.palette.warning.main],
      xaxis: {
        categories: slot === 'All Time' ? datesChart : datesChart.slice(datesChart.length - 8, datesChart.length),
        labels: {
          style: {
            colors: datesChart.map(() => secondary),
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === 'All Time' ? datesChart.length : 8,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter(val) {
            let isNegative = false;
            if (val < 0) {
              isNegative = true;
              val = Math.abs(val);
            }
          
            if (val < 1000) {
              return isNegative ? `-$${val}M` : `$${val}M`;
            } else {
              return isNegative ? `-$${Math.round((val / 1000) * 10) / 10}B` : `$${Math.round((val / 1000) * 10) / 10}B`;
            }
          },
        },
      },
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'Revenue',
      data: [0, 86, 28, 115, 48, 210, 136],
    },
    {
      name: 'Operating Expenses',
      data: [0, 43, 14, 56, 24, 105, 68],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Revenue',
        data:
          slot === 'All Time'
            ? revenueValuesChart
            : revenueValuesChart.slice(revenueValuesChart.length - 8, revenueValuesChart.length),
      },
      {
        name: 'Operating Expenses',
        data:
          slot === 'All Time'
            ? operatingExpensesValuesChart
            : operatingExpensesValuesChart.slice(
                operatingExpensesValuesChart.length - 8,
                operatingExpensesValuesChart.length,
              ),
      },
      {
        name: 'Cost of Revenue',
        data: slot === 'All Time' ? costOfRevenue : costOfRevenue.slice(costOfRevenue.length - 8, costOfRevenue.length),
      },
    ]);
  }, [slot]);

  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={450} />
    </div>
  );
};

RevenueChart.propTypes = {
  slot: PropTypes.string,
};

export default RevenueChart;
