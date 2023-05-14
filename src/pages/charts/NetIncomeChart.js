import PropTypes from 'prop-types';
import { 
    //useState, 
    useEffect 
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
      data: netIncome,
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
    xaxis: {
      categories: datesChart,
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
        color: '#666',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {},
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
