import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useTheme } from '@mui/material/styles';

// assets
import {
  RiseOutlined,
  FallOutlined,
  //DownOutlined,
  //UpOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticCard = ({
  title,
  metricName,
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
  //console.log(title);
  //console.log(companyTicker);
  //console.log(companyName);
  //console.log(quarter);
  //console.log(count);
  //console.log(countFormatted);
  //console.log(percentageChangeQuarter);
  //console.log(countPreviousQuarter);
  //console.log(countPreviousQuarterFormatted);
  //console.log(percentageChange);
  //console.log('-----------------------------');

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={1.7}>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            {/*
            <Chip
              variant="combined"
              style={{
                backgroundColor: count < 0 ? theme.palette.error.main : theme.palette.success.main,
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
              color={count >= 0 ? 'warning' : 'warning'}
              icon={
                <>
                  {count >= 0 && <UpOutlined style={{ fontSize: '1.2rem', color: '#fff' }} />}
                  {count < 0 && <DownOutlined style={{ fontSize: '1.2rem', color: '#fff' }} />}
                </>
              }
              label={countFormatted}
              sx={{ ml: 0, pl: 1 }}
              size="medium"
            />
            */}

            <Typography
              variant="h4"
              color="inherit"
              style={{
                color: count < 0 && theme.palette.error.main,
              }}
            >
              {countFormatted.replace('$-', '-$')}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Chip
                  variant="combined"
                  icon={
                    <>
                      {percentageChange > 0 && <RiseOutlined style={{ fontSize: 'rem', color: 'inherit' }} />}
                      {percentageChange < 0 && <FallOutlined style={{ fontSize: '1rem', color: 'inherit' }} />}
                      {percentageChange === 0 && <SwapRightOutlined style={{ fontSize: '1rem', color: 'inherit' }} />}
                    </>
                  }
                  label={`${percentageChange}%`}
                  sx={{ ml: 1.25, pl: 1 }}
                  size="small"
                  style={{
                    backgroundColor:
                      percentageChange < 0
                        ? theme.palette.error.light
                        : percentageChange > 0
                        ? theme.palette.success.light
                        : theme.palette.secondary.light,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
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
            {Math.abs(percentageChange)}%
          </span>{' '}
          {(() => {
            switch (true) {
              case percentageChange >= 0 && count < 0 && countPreviousQuarter < 0:
                return <span>less</span>;
              case percentageChange < 0 && count < 0 && countPreviousQuarter < 0:
                return <span>more</span>;
              case percentageChange >= 0 && count >= 0 && countPreviousQuarter >= 0:
                return <span>more</span>;
              case percentageChange < 0 && count >= 0 && countPreviousQuarter >= 0:
                return <span>less</span>;
              case percentageChange >= 0 && count >= 0 && countPreviousQuarter < 0:
                return <span>more</span>;
              case percentageChange < 0 && count < 0 && countPreviousQuarter >= 0:
                return <span>more</span>;
              // eslint-disable-next-line
              case percentageChange < 0 && count >= 0 && countPreviousQuarter >= 0:
                return <span>less</span>;
              default:
                return <span></span>;
            }
          })()}{' '}
          than in {percentageChangeQuarter}, when they {countPreviousQuarter < 0 ? <span>lost</span> : <span>made</span>}{' '}
          <Typography
            component="span"
            variant="caption"
            sx={{ color: countPreviousQuarter < 0 ? theme.palette.error.main : theme.palette.success.main, fontWeight: 'bold' }}
          >
            {countPreviousQuarterFormatted.replace('-', '')}
          </Typography>
          . {percentageChange > 0 ? <span>Growing {metricName} is a good sign.</span> : <span>Decreasing {metricName} is not a good sign.</span>}
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
