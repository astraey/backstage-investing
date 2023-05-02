import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

import { dollarFormatter } from 'utils/dollarFormatter';

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
  }, [slot, datesChart, comprehensiveIncomeNetOfTax]);

  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      chart: {
        type: 'bar',
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
                color: theme.palette.success.light,
              },
              {
                from: -10000000,
                to: 0,
                color: theme.palette.error.light,
              },
            ],
          },
          columnWidth: '70%',
          borderRadius: 3,
        },
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          foreColor: '#000',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.4,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45,
          },
        },
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
            let isNegative = false;
            if (val < 0) {
              isNegative = true;
              val = Math.abs(val);
            }

            if (val < 1000) {
              return isNegative ? `-$${val}M` : `$${val}M`;
            } else {
              return isNegative
                ? `-$${Math.round((val / 1000) * 10) / 10}B`
                : `$${Math.round((val / 1000) * 10) / 10}B`;
            }
          },
        },
      },
      colors: [info],
    });
  }, [slot, datesChart, comprehensiveIncomeNetOfTax]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={500} />
    </div>
  );
};

export default ComprehensiveIncomeChart;
