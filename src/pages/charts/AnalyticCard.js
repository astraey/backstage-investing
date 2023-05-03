import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useTheme } from '@mui/material/styles';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticCard = ({
  title,
  count,
  countFormatted,
  companyTicker,
  companyName,
  quarter,
  percentageChange,
  percentageChangeQuarter,
  countPreviousQuarter,
  countPreviousQuarterFormatted,
}) => {
  const theme = useTheme();
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={1.7}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {countFormatted}
            </Typography>
          </Grid>
          {percentageChange && (
            <Grid item>
              <Chip
                variant="combined"
                style={{
                  backgroundColor: count < 0 ? theme.palette.error.light : theme.palette.success.light,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
                color={count >= 0 ? 'warning' : 'warning'}
                icon={
                  <>
                    {count >= 0 && <RiseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />}
                    {count < 0 && <FallOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />}
                  </>
                }
                label={`${percentageChange}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="medium"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          {companyName || companyTicker} {count < 0 ? <span>lost</span> : <span>made</span>}{' '}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: count < 0 ? theme.palette.error.main : theme.palette.success.main, fontWeight: 'bold' }}
          >
            {countFormatted.replace('-', '')}
          </Typography>{' '}
          in {quarter}, {count < 0 ? <span>loosing</span> : <span>making</span>}{' '}
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            {percentageChange}%
          </span>{' '}
          more than in {percentageChangeQuarter}, when they {countPreviousQuarter < 0 ? <span>lost</span> : <span>made</span>}{' '}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: countPreviousQuarter < 0 ? theme.palette.error.main : theme.palette.success.main, fontWeight: 'bold' }}
          >
            {countPreviousQuarterFormatted.replace('-', '')}
          </Typography>{' '}
        </Typography>
      </Box>
    </MainCard>
  );
};

AnalyticCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AnalyticCard.defaultProps = {
  color: 'primary',
};

export default AnalyticCard;
