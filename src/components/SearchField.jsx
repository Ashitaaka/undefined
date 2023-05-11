import React from 'react'

const SearchField = ({handlerCityValue, cityField}) => {
  return (
    <input 
            type="text" 
            id="city" 
            name='city' 
            placeholder="Choose a city" 
            value={cityField} 
            onChange={handlerCityValue}
    />
  )
}

export default SearchField