import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//importing components
import CountrySelect from '.././components/CountrySelecter'
import countries from '../datas/CountryDatas.js' //Countries list
import SearchField from './SearchField'

//importing assets
import { BiMapPin } from 'react-icons/bi'
import { MdDateRange } from 'react-icons/md'

//importing CSS
import '.././css/SearchBar.css'
import axios from 'axios'

const accessCityToken = import.meta.env.VITE_CITIES_API_TOKEN

const SearchBar = ({ 
    selectedCity,
    selectedCountry,
    setSelectedCountry,
    setSelectedCity,
    setArrivalDate,
    setReturnDate,
    cityField,
    setCityField
}) => {

    const [allCities, setAllCities] = useState([]);
    const [citiesOfCountry, setCitiesOfCountry] = useState([])
    const [citiesNames, setCitiesNames] = useState([]);
    

    useEffect(()=>{
        if(selectedCountry !== ""){
        const config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${selectedCountry.code}/cities`,
            headers: {
              'X-CSCAPI-KEY': accessCityToken
            }
          };
          
          axios(config)
            .then((res) => (res.data))
            .then((data) => setAllCities(data))
            .catch((error) => console.log(error));
        }
    }, [selectedCountry]);


    const handlerCityValue = (e) =>{
        const tata = e.target.value
        setCityField(e.target.value)

        const toto = allCities
            .filter(city => city.name.toLowerCase().startsWith(tata.toLowerCase()))
            .map((city)=> city.name)
        setCitiesOfCountry(toto)

        setCitiesNames(toto.filter((el, index) => index<=4 && tata))
    }

    const handlerCitySelect = (city) => {
        setSelectedCity(city);
        setCityField(city);
        setCitiesNames([]);
    }

    const handlerArrivalDate = (newValue) =>{
        let arrivalDate = newValue.$d
        setArrivalDate(arrivalDate.toISOString().substring(0, 10));
    }

    const handlerReturnDate = (newValue) =>{
        let returnDate = newValue.$d
        setReturnDate(returnDate.toISOString().substring(0, 10)); 
    }

  return (
    <div className='search-bar'>
        <div className="location-container">
            <div className="country-selection">
                <div className="caption-container">
                    <BiMapPin />
                    <p className='caption'>Country</p>
                </div>
                <CountrySelect
                    datas={countries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    setAllCities={setAllCities}
                />
            </div>
            <div className="city-selection">
                <div className="caption-container">
                    <BiMapPin />
                    <p className='caption'>City</p>
                </div>
                <SearchField
                    cityField={cityField}
                    setCityField={setCityField}
                    handlerCityValue={handlerCityValue}
                />
                {citiesNames.length > 0 &&
                    <ul className='dropdown-menu'>
                    {citiesNames.map((city, index) =>(
                        <li
                            key={index}
                            onClick={() => handlerCitySelect(city)}
                        >
                            {city}
                        </li>
                    ))}
                    </ul>
                }
            </div>
        </div>
        <div className="dates-container">
            <div className="dates-selection">
                <div className="caption-container">
                    <MdDateRange />
                    <p className='caption'>Arrival date</p>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '100%', '& .MuiOutlinedInput-root': { backgroundColor: '#fff', color: '#999', fontSize: 14 }}}
                        onChange={handlerArrivalDate}
                    />
                </LocalizationProvider>
            </div>
            <div className="dates-selection">
                <div className="caption-container">
                    <MdDateRange />
                    <p className='caption'>Return date</p>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '100%', '& .MuiOutlinedInput-root': { backgroundColor: '#fff', color: '#999', fontSize: 14 }}}
                        onChange={handlerReturnDate}
                    />
                </LocalizationProvider>
            </div>
        </div>
    </div>
  )
}

export default SearchBar