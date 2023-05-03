import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// ==============================|| SALES COLUMN CHART ||============================== //

const RevenueChart2 = ({ slot, datesChart, revenueValuesChart, operatingExpensesValuesChart }) => {
  const theme = useTheme();

  // chart options
  const columnChartOptions = {
    chart: {
      type: 'bar',
      height: 430,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent'],
    },
    xaxis: {
      categories: slot === 'All Time' ? datesChart.reverse() : datesChart.slice(0, 7).reverse(),
    },
    yaxis: {
      title: {
        text: '$(M)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$${val}M`;
        },
      },
    },
    legend: {
      show: true,
      fontFamily: `'Public Sans', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: '50%',
        offsexX: 2,
        offsexY: 2,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 50,
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false,
          },
        },
      },
    ],
  };

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series] = useState([
    {
      name: 'Revenue',
      data: slot === 'All Time' ? revenueValuesChart.reverse() : revenueValuesChart.slice(0, 7).reverse(),
    },
    {
      name: 'Operating Expenses',
      data: slot === 'All Time' ? operatingExpensesValuesChart.reverse() : operatingExpensesValuesChart.slice(0, 7).reverse(),
    },
  ]);

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary],
          },
        },
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
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500',
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      {JSON.stringify(slot)}
      <ReactApexChart options={options} series={series} type="bar" height={430} />
    </div>
  );
};

export default RevenueChart2;
