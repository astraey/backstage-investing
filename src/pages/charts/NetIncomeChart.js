import PropTypes from 'prop-types';
import {
  //useState,
  useEffect,
} from 'react';
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

const NetIncomeChart = ({ slot, datesChart, netIncome }) => {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  //const [options, setOptions] = useState(NetIncomeChart);
  console.log(netIncome);
  useEffect(() => {}, [slot, datesChart, netIncome]);

  const series = [
    {
      name: 'Net Income',
      data: slot === 'All Time' ? netIncome : netIncome.slice(netIncome.length - 7, netIncome.length),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    forecastDataPoints: {
      count: 0,
    },
    stroke: {
      width: 5,
      curve: 'smooth',
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
        } else if (val >= 1000) {
          return isNegative ? `-$${Math.round((val / 1000) * 10) / 10}B` : `$${Math.round((val / 1000) * 10) / 10}B`;
        }
      },
    },
    xaxis: {
      categories: slot === 'All Time' ? datesChart : datesChart.slice(datesChart.length - 7, datesChart.length),
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: datesChart.map(() => secondary),
        },
      },
    },
    title: {
      text: 'Net Income',
      align: 'left',
      style: {
        fontSize: '16px',
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: [secondary],
        },
        formatter(val) {
          let isNegative = false;
          if (val < 0) {
            isNegative = true;
            val = Math.abs(val);
          }

          if (val < 1000) {
            return isNegative ? `-$${val}M` : `$${val}M`;
          } else if (val >= 1000) {
            return isNegative ? `-$${Math.round((val / 1000) * 10) / 10}B` : `$${Math.round((val / 1000) * 10) / 10}B`;
          }
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

NetIncomeChart.propTypes = {
  slot: PropTypes.string,
};

export default NetIncomeChart;
