import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Chip } from '@mui/material';

const RevenueIconGenerator = ({ slot, datesChart, revenueValuesChart, costOfRevenue }) => {
  let revenueValues = slot === 'All Time' ? revenueValuesChart : revenueValuesChart.slice(revenueValuesChart.length - 8, revenueValuesChart.length);
  let costOfRevenueValues = slot === 'All Time' ? costOfRevenue : costOfRevenue.slice(costOfRevenue.length - 8, costOfRevenue.length);
  let dates = slot === 'All Time' ? datesChart : datesChart.slice(datesChart.length - 8, datesChart.length);
  let averageSum = 0;
  let averageMargin;
  let countSum = 0;

  if (revenueValues.length === dates.length && revenueValues.length === costOfRevenueValues.length) {
    for (let i = 0; i < dates.length; i++) {
      if (!(isNaN(revenueValues[i]) || isNaN(costOfRevenueValues[i]))) {
        countSum++;
        averageSum += Math.round(((revenueValues[i] - costOfRevenueValues[i]) / Math.abs(revenueValues[i])) * 100);
      }
    }
    averageMargin = averageSum / countSum;
  }

  return (
    <span>
      {averageMargin > 50 ? (
        <Chip color="success" variant="outlined" size="small" label="Awesome" icon={<RocketLaunchIcon />} />
      ) : averageMargin <= 50 && averageMargin >= 25 ? (
        <Chip color="info" variant="outlined" size="small" label="Acceptable Range" icon={<CheckCircleIcon />} />
      ) : averageMargin < 24 && averageMargin >= 0 ? (
        <Chip color="warning" variant="outlined" size="small" label="Not Great" icon={<WarningIcon />} />
      ) : averageMargin < 0 ? (
        <Chip color="error" variant="outlined" size="small" label="Loosing Money" icon={<LocalFireDepartmentIcon />} />
      ) : (
        <span>no info</span>
      )}
    </span>
  );
};

export default RevenueIconGenerator;
