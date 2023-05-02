// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useParams } from 'react-router-dom';

// assets
import { SearchOutlined } from '@ant-design/icons';

import { Container, TextField, Link, Stack, Typography } from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const companies = require('data/companies.json');
const filter = createFilterOptions();

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  console.log(window.location.pathname);
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 3 } }}>
      {window.location.pathname !== '/' ? (
        <FormControl sx={{ width: { xs: '100%', md: 500 } }}>
          <Autocomplete
            value={value}
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
                //setValue(newValue);
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
            renderInput={(params) => <TextField placeholder="Search for a Company" {...params} label="" />}
          />
        </FormControl>
      ) : (
        <span></span>
      )}
    </Box>
  );
};

export default Search;
