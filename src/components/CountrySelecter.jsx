import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CountrySelect({datas, setSelectedCountry, setAllCities}) {

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue === null) {
      setSelectedCountry("");
      setAllCities([])
    } else {
      setSelectedCountry(newValue);
    }
  };


  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300, '& .MuiAutocomplete-input': { color: '#000', fontSize: 14 }, '.MuiInputBase-root': {backgroundColor: '#fff'} }}
      options={datas}
      onChange={handleAutocompleteChange}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) 
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Choose a country'
          // label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
            
          }}
          
        />
      )}
    />
  );
}

