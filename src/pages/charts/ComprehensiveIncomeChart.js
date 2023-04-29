import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const ComprehensiveIncomeChart = ({ slot, datesChart, comprehensiveIncomeNetOfTax }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;
  const [series, setSeries] = useState({});
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
                to: 1000,
                color: theme.palette.primary[200],
              },
              {
                from: -1000,
                to: 0,
                color: theme.palette.error.light,
              },
            ],
          },
          columnWidth: '40%',
          borderRadius: 3,
        },
      },
      dataLabels: {
        enabled: true,
        formatter(val) {
          return `$${val}B`;
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
      grid: {
        show: true,
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
