import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Link from '@mui/material/Link';

// material-ui
import {
  Grid,
  Container,
  TextField,
  Typography,
} from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { useMediaQuery } from '@mui/material';

const companies = require('data/companies.json');

const filter = createFilterOptions();

const CompanySelection = () => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <div>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '60vh', minWidth: '80vw' }}>
        <Grid item xs={3}>
          <Typography variant="h2" style={{ fontSize: matchesXs ? '6vw' : '3vw' }}>
            Search for a Company
          </Typography>
          <br></br>
          <br></br>
        </Grid>
        <Grid item xs={7}>
          <Autocomplete
            value={value}
            style={{ width: '60vw' }}
            onChange={(event, newValue) => {
              navigate(`company/${newValue.ticker}`);
              if (typeof newValue === 'string') {
                setValue({
                  nameTicker: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  nameTicker: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            id="free-solo-with-text-demo"
            options={companies}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.nameTicker;
            }}
            renderOption={(props, option) => <li {...props}>{option.nameTicker}</li>}
            renderInput={(params) => <TextField placeholder="Search" {...params} label="" />}
          />
        </Grid>
        <Grid item xs={3}>
          <br></br>
          <br></br>
          <Typography variant="body1" style={{ fontSize: matchesXs ? '2vw' : '1vw' }}>
            Or check out our{' '}
            <Link style={{ color: '#5F9F9F',  fontSize: matchesXs ? '2vw' : '1vw' }} variant="body1" href="/investing-fundamentals/">
              <b>investing fundamentals</b>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <>
        <Container maxWidth="md" sx={{ mt: 30 }}></Container>
      </>
    </div>
  );
};
export default CompanySelection;
