import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useMediaQuery } from '@mui/material';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
import Logo from './Logo';
import LogoNoText from './LogoNoText';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <span>
      {matchesXs ? (
        <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
          <LogoNoText />
        </ButtonBase>
      ) : (
        <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
          <Logo />
        </ButtonBase>
      )}
    </span>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
