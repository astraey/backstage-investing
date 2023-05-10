// material-ui
import {
  //Box,
  //Grid,
  useMediaQuery,
} from '@mui/material';
//import { GithubOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
//import Notification from './Notification';
//import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      <Search />
      {/*Commented Out Mobile Responsiveness*/}
      {/*!matchesXs && <Search />*/}
      {/*matchesXs && <Box sx={{ width: '100%', ml: 1 }} />*/}

      {/*
      <IconButton
        component={Link}
        href="https://github.com/codedthemes/mantis-free-react-admin-template"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton>
      */}
      {/*
      <Notification />
      
      //Commented Out Mobile Responsiveness
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
      */}
      {/*matchesXs?<span>This Matches</span>: <span>this does not match</span>*/}
      <Profile showUsername={!matchesXs} />
    </>
  );
};

export default HeaderContent;
