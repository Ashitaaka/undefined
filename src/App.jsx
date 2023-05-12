import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import axios, { Axios } from 'axios'

//importing components
import SearchBar from './components/SearchBar'
import CityEvents from './components/CityEvents';

const accessToken = import.meta.env.VITE_API_TOKEN

function App() {

    const [location, setLocation] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cityEvents, setCityEvents] = useState([])
    const [loadCityEvents, setLoadCityEvents] = useState(false)
    const [filteredCat, setFilteredCat] = useState([])
    const [selectedCat, setSelectedCat] = useState(null)
   


    // Fetch the city to get Location
    useEffect(()=>{
      
      if(selectedCity !== "" && selectedCountry !== ""){
      axios
        .get(
          `https://api.predicthq.com/v1/places/?q=${selectedCity},${selectedCountry}`,
          {
            headers: {
              'Authorization': accessToken,
            },
          }
        )
        .then(res => res.data)
        .then(data => {
          setLocation(data.results[0].location);
          setLoad(true);
        })
        .catch((err)=>{
          console.log(err)
        })
      } 
    }, [selectedCity])


  //fetch all events
  useEffect(()=>{
    if(load) {
      axios
      .get(
        `https://api.predicthq.com/v1/events/?within=2mi@${location[1]},${location[0]}&limit=20`,
        {
          headers: {
            'Authorization': accessToken,
          },
        }
      )
      .then(res => res.data)
      .then(data => {
        setCityEvents(data.results);
        setFilteredCat(data.results);
        setLoadCityEvents(true);
      })
      .catch((err)=>{
        console.log(err)
      })
    }  
  }, [location])

  return (
      <div className='home-page'>
      <div className={selectedCity.length > 1 && loadCityEvents === false ? 'loading-page-active' :'loading-page-hide' }>
          <div className="letter-holder">
            <div className="l-1 letter">L</div>
            <div className="l-2 letter">o</div>
            <div className="l-3 letter">a</div>
            <div className="l-4 letter">d</div>
            <div className="l-5 letter">i</div>
            <div className="l-6 letter">n</div>
            <div className="l-7 letter">g</div>
            <div className="l-8 letter">.</div>
            <div className="l-9 letter">.</div>
            <div className="l-10 letter">.</div>
          </div>
        </div>
        <div className="container">
          <div className='title'>
            <h1 className='home-title'>Undefined</h1>
            <h2 className='home-subtitle'>Travel</h2>
          </div>
          <SearchBar 
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          />
        </div>

        <CityEvents cityEvents={cityEvents} setFilteredCat={setFilteredCat} filteredCat={filteredCat} setSelectedCat={setSelectedCat} loadCityEvents={loadCityEvents} />

      </div>
  )
}


export default App
