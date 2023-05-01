import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// material-ui
import { Container, InputAdornment, TextField, Link, Stack, Typography } from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const companies = require('data/companies.json');

const filter = createFilterOptions();

const CompanySelection = () => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <>
        <Container maxWidth="md" sx={{ mt: 30 }}>
          <Typography variant="h2" style={{ textAlign: 'center' }}>
            Search for a Company
          </Typography>
          <br></br>
          <Autocomplete
            value={value}
            sx={{ width: 900, height: 300 }}
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
        </Container>
      </>
    </div>
  );
};
export default CompanySelection;
