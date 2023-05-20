import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const ComprehensiveIncomeChart = ({ slot, datesChart, comprehensiveIncomeNetOfTax }) => {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  //const { primary } = theme.palette.text;
  const info = theme.palette.info.light;
  const line = theme.palette.divider;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setSeries([
      {
        name: 'Comprehensive Income Net Of Tax',
        data:
          slot === 'All Time'
            ? comprehensiveIncomeNetOfTax
            : comprehensiveIncomeNetOfTax.slice(comprehensiveIncomeNetOfTax.length - 8, comprehensiveIncomeNetOfTax.length),
      },
    ]);
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
                to: 999999999999,
                color: theme.palette.success.light,
              },
              {
                from: -999999999999,
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
            } else if (val >= 1000) {
              return isNegative ? `-$${Math.round((val / 1000) * 10) / 10}B` : `$${Math.round((val / 1000) * 10) / 10}B`;
            }
          },
        },
      },
      colors: [info],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot, datesChart, comprehensiveIncomeNetOfTax]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={500} />
    </div>
  );
};

export default ComprehensiveIncomeChart;
