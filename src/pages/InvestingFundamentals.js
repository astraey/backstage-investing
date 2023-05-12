// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const InvestingFundamentals = () => (
  <MainCard title="Investing Fundamentals">
    <Typography variant="body1">
      Here, we will tell users the very basics of value investing, summarized in the following 3 questions:
      <li>Is the company Making Money?</li>
      <li>Will the company have the ability to make money in the future?</li>
      <li>How is the company currently valued based on the two questions above?</li>
    </Typography>
  </MainCard>
);

export default InvestingFundamentals;
