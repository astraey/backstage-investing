import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useTheme } from '@mui/material/styles';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticCard = ({ color, title, count, percentage, isLoss, extra, companyTicker, quarter }) => {
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
              <Grid>
                <Chip
                  style={
                    count >= 0
                      ? { backgroundColor: theme.palette.success.light }
                      : { backgroundColor: theme.palette.error.light }
                  }
                  variant="combined"
                  color={count >= 0 ? 'warning' : 'warning'}
                  icon={
                    <>
                      {count >= 0 && <RiseOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />}
                      {count < 0 && <FallOutlined style={{ fontSize: '1.5rem', color: '#fff' }} />}
                    </>
                  }
                  label={
                    count < 1000 && count > -1000
                      ? `$${Math.abs(count)}M`
                      : `$${Math.round((Math.abs(count) / 1000) * 10) / 10}B`
                  }
                  sx={{ ml: 0, pl: 1 }}
                  size="medium"
                />
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        {count < 0 ? (
          <Typography variant="caption" color="textSecondary">
            {companyTicker} lost{' '}
            <Typography component="span" variant="caption" sx={{ color: theme.palette.error.main }}>
              {count < 1000 && count > -1000
                ? `$${Math.abs(count)}M`
                : `$${Math.round((Math.abs(count) / 1000) * 10) / 10}B`}
            </Typography>{' '}
            in {quarter}
          </Typography>
        ) : (
          <Typography variant="caption" color="textSecondary">
            {companyTicker} made{' '}
            <Typography
              component="span"
              variant="caption"
              sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}
            >
              {count < 1000 && count > -1000
                ? `$${Math.abs(count)}M`
                : `$${Math.round((Math.abs(count) / 1000) * 10) / 10}B`}
            </Typography>{' '}
            in {quarter}
          </Typography>
        )}
      </Box>
    </MainCard>
  );
};

AnalyticCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

AnalyticCard.defaultProps = {
  color: 'primary',
};

export default AnalyticCard;
