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
  useEffect(() => {}, [slot, datesChart, netIncome]);

  const series = [
    {
      name: 'Net Income',
      data: slot === 'All Time' ? netIncome : netIncome.slice(netIncome.length - 8, netIncome.length),
    },
  ];

  const generateColors = (data) => {
    return data.map((d, idx) => {
      let color = d >= 0 ? '#95de64' : '#ffa39e';

      return {
        offset: (idx / (data.length - 1)) * 100,
        color,
        opacity: 1,
      };
    });
  };

  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 5,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: generateColors(slot === 'All Time' ? netIncome : netIncome.slice(netIncome.length - 8, netIncome.length)),
      },
    },
    forecastDataPoints: {
      count: 0,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
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
    xaxis: {
      categories: slot === 'All Time' ? datesChart : datesChart.slice(datesChart.length - 8, datesChart.length),
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
