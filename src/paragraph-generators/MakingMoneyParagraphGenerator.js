import { DollarFormatter } from 'utils/DollarFormatter';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MakingMoneyParagraphGenerator = ({ companyName, companyTicker, comprehensiveIncomeNet }) => {
  const theme = useTheme();
  let comprehensiveIncomeNetValues = comprehensiveIncomeNet.slice(comprehensiveIncomeNet.length - 8, comprehensiveIncomeNet.length);
  let IncomeSum = 0;

  comprehensiveIncomeNetValues.forEach((element) => {
    IncomeSum += element;
  });

  return (
    <span>
      {IncomeSum > 0 ? (
        <Typography component="span" sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
          Yes
        </Typography>
      ) : (
        <Typography component="span" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
          No
        </Typography>
      )}
      , in the last 2 years, {companyName} {IncomeSum > 0 ? <span>made</span> : <span>lost</span>}{' '}
      <Typography component="span" sx={{ color: IncomeSum < 0 ? theme.palette.error.main : theme.palette.success.main, fontWeight: 'bold' }}>
        {DollarFormatter(IncomeSum.toFixed(1))}
      </Typography>
      . This value includes gains and losses that {companyName} has accumulated, including unrealized gains or losses, after taxes.
    </span>
  );
};

export default MakingMoneyParagraphGenerator;
