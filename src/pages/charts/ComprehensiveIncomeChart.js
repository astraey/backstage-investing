import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const ComprehensiveIncomeChart = ({ slot, datesChart, comprehensiveIncomeNetOfTax }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [series, setSeries] = useState([]);
  const line = theme.palette.divider;

  useEffect(() => {
    setSeries([
      {
        name: 'Comprehensive Income Net Of Tax',
        data:
          slot === 'All Time'
            ? comprehensiveIncomeNetOfTax
            : comprehensiveIncomeNetOfTax.slice(
                comprehensiveIncomeNetOfTax.length - 7,
                comprehensiveIncomeNetOfTax.length,
              ),
      },
    ]);
  }, [slot]);

  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      chart: {
        type: 'bar',
        height: 365,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 10000000,
                color: theme.palette.success.main,
              },
              {
                from: -10000000,
                to: 0,
                color: theme.palette.error.main,
              },
            ],
          },
          columnWidth: '40%',
          borderRadius: 3,
        },
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.3,
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
          if (val < 1000 && val > -1000) {
            return `$${val}M`;
          } else {
            return `$${Math.round((val / 1000) * 10) / 10}B`;
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
      yaxis: {
        show: true,
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 0,
            borderColor: '#111',
            borderWidth: 1,
            opacity: 1,
          },
        ],
      },
      grid: {
        show: true,
        borderColor: line,
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter(val) {
            if (val < 1000 && val > -1000) {
              return `$${val}M`;
            } else {
              return `$${Math.round((val / 1000) * 10) / 10}B`;
            }
          },
        },
      },
      colors: [info],
    });
  }, [slot]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default ComprehensiveIncomeChart;
