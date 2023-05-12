import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// material-ui
import {
  //Grid,
  TextField,
  Typography,
} from '@mui/material';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const companies = require('data/companies.json');

const filter = createFilterOptions();

const CompanySelection = () => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h1">Search for a Company</Typography>
      <br></br>
      <br></br>
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
    </div>
  );
};
export default CompanySelection;
