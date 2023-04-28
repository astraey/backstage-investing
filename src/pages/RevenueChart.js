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
    enabled: false,
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

  //console.log(inputChartDataOptions);
  //console.log(inputChartDataSeries);
  //console.log(slot);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.success.light, theme.palette.error.light],
      xaxis: {
        categories: slot === 'All Time' ? datesChart.reverse() : datesChart.slice(0,7).reverse(),
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
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
        data: slot === 'All Time' ? revenueValuesChart.reverse() : revenueValuesChart.slice(0,7).reverse(),
      },
      {
        name: 'Operating Expenses',
        data: slot === 'All Time' ? operatingExpensesValuesChart.reverse() : operatingExpensesValuesChart.slice(0,7).reverse(),
      },
    ]);
  }, [slot]);

  return (
    <div>
      {/*JSON.stringify(datesChart)*/}
      {/*JSON.stringify(revenueValuesChart)*/}
      {/*JSON.stringify(operatingExpensesValuesChart)*/}
      <ReactApexChart options={options} series={series} type="area" height={450} />
    </div>
  );
};

RevenueChart.propTypes = {
  slot: PropTypes.string,
};

export default RevenueChart;
