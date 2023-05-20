import PropTypes from 'prop-types';
import {
  //useState,
  useEffect,
} from 'react';
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

const NetIncomeChart = ({ slot, datesChart, netIncome, comprehensiveIncomeNetOfTax }) => {
  const theme = useTheme();
  const info = theme.palette.info.light;
  const { secondary } = theme.palette.text;

  const line = theme.palette.divider;
  //const [options, setOptions] = useState(NetIncomeChart);
  useEffect(() => {}, [slot, datesChart, netIncome]);

  const series = [
    {
      name: 'Net Income',
      data: slot === 'All Time' ? netIncome : netIncome.slice(netIncome.length - 8, netIncome.length),
    },
    {
      name: 'Comprehensive Income Net Of Tax',
      data:
        slot === 'All Time'
          ? comprehensiveIncomeNetOfTax
          : comprehensiveIncomeNetOfTax.slice(comprehensiveIncomeNetOfTax.length - 8, comprehensiveIncomeNetOfTax.length),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      width: 6,
      colors: ['transparent'],
    },
    plotOptions: {
      bar: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
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
        borderRadius: 2,
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
    fill: {
      opacity: 1,
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
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: ['#555555', '#999999'],
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    colors: [info],
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

NetIncomeChart.propTypes = {
  slot: PropTypes.string,
};

export default NetIncomeChart;
