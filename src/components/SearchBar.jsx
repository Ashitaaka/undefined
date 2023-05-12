import React, { useEffect, useState } from 'react'

//importing components
import CountrySelect from '.././components/CountrySelecter'
import countries from '../datas/CountryDatas.js' //Countries list

//importing assets
import { BiMapPin } from 'react-icons/bi'

//importing CSS
import '.././css/SearchBar.css'
import axios from 'axios'
import SearchField from './SearchField'

const accessCityToken = import.meta.env.VITE_CITIES_API_TOKEN

const SearchBar = ({ 
    selectedCity,
    selectedCountry,
    setSelectedCountry,
    setSelectedCity 
}) => {

    const [cityField, setCityField] = useState("");
    const [allCities, setAllCities] = useState([]);
    const [citiesOfCountry, setCitiesOfCountry] = useState([])
    const [citiesNames, setCitiesNames] = useState([]);
    
    

    // selectedCountry && console.log(selectedCountry);
    // selectedCountry && console.log(selectedCountry.code);

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


    // console.log(allCities);

    const handlerCityValue = (e) =>{
        const tata = e.target.value
        setCityField(e.target.value)

        const toto = allCities
            .filter(city => city.name.toLowerCase().startsWith(tata.toLowerCase()))
            .map((city)=> city.name)
        setCitiesOfCountry(toto)

        setCitiesNames(toto.filter((el, index) => index<=10 && tata))
    }

    const handlerCitySelect = (city) => {
        setSelectedCity(city);
        setCityField("");
        setCitiesNames([]);
    }

    // console.log(selectedCity);
    // console.log(selectedCountry.label);

  return (
    <div className='search-bar'>
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
  )
}

export default SearchBar