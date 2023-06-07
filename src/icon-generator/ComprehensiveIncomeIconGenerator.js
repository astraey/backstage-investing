import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Chip } from '@mui/material';

const ComprehensiveIncomeIconGenerator = ({ slot, datesChart, revenueValuesChart, costOfRevenue, comprehensiveIncomeNetOfTax }) => {
  let revenueValues = slot === 'All Time' ? revenueValuesChart : revenueValuesChart.slice(revenueValuesChart.length - 8, revenueValuesChart.length);
  let comprehensiveIncomeNetOfTaxValues =
    slot === 'All Time'
      ? comprehensiveIncomeNetOfTax
      : comprehensiveIncomeNetOfTax.slice(comprehensiveIncomeNetOfTax.length - 8, comprehensiveIncomeNetOfTax.length);

  let comprehensiveIncomeSum = 0;
  let revenueSum = 0;

  comprehensiveIncomeNetOfTaxValues.forEach((element) => {
    comprehensiveIncomeSum += element;
  });

  revenueValues.forEach((element) => {
    revenueSum += element;
  });

  let comprehensiveIncomeAverage = comprehensiveIncomeSum / comprehensiveIncomeNetOfTaxValues.length;
  let revenueAverage = revenueSum / revenueValues.length;
  let percentageDifference = (comprehensiveIncomeAverage / revenueAverage) * 100;

  return (
    <span>
      {percentageDifference > 25 ? (
        <Chip color="success" variant="outlined" size="small" label="Awesome" icon={<RocketLaunchIcon />} />
      ) : percentageDifference <= 25 && percentageDifference >= 10 ? (
        <Chip color="info" variant="outlined" size="small" label="Acceptable Range" icon={<CheckCircleIcon />} />
      ) : percentageDifference < 10 && percentageDifference >= 0 ? (
        <Chip color="warning" variant="outlined" size="small" label="Not Great" icon={<WarningIcon />} />
      ) : percentageDifference < 0 ? (
        <Chip color="error" variant="outlined" size="small" label="Loosing Money" icon={<LocalFireDepartmentIcon />} />
      ) : (
        <span>no info</span>
      )}
    </span>
  );
};

export default ComprehensiveIncomeIconGenerator;
