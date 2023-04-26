import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

const CompanySelection = () => {
  return (
    <div>
      <h1>Company Selection Page</h1>
      <p>
        <Link variant="h6" component={RouterLink} to="/company/AMZN" color="text.primary">
          Amazon
        </Link>
      </p>
      <p>
        <Link variant="h6" component={RouterLink} to="/company/AAPL" color="text.primary">
          Apple
        </Link>
      </p>
      <p>
        <Link variant="h6" component={RouterLink} to="/company/MSFT" color="text.primary">
          Microsoft
        </Link>
      </p>
      <p>
        <Link variant="h6" component={RouterLink} to="/company/TSLA" color="text.primary">
          Tesla
        </Link>
      </p>
    </div>
  );
};
export default CompanySelection;
