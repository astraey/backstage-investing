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
      return `$${val}B`;
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

const RevenueChart = ({ slot, datesChart, revenueValuesChart, operatingExpensesValuesChart }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary[200], theme.palette.error.light],
      xaxis: {
        categories: slot === 'All Time' ? datesChart : datesChart.slice(datesChart.length - 7, datesChart.length),
        labels: {
          style: {
            colors: datesChart.map(() => secondary),
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === 'All Time' ? 11 : 7,
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
            return `$${val}B`;
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
        data: slot === 'All Time' ? revenueValuesChart : revenueValuesChart.slice(0, 7),
      },
      {
        name: 'Operating Expenses',
        data: slot === 'All Time' ? operatingExpensesValuesChart : operatingExpensesValuesChart.slice(0, 7),
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
