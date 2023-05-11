import { useState, useEffect} from 'react'
import './App.css'
import axios, { Axios } from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CityEvents from './components/CityEvents';

const accessToken = import.meta.env.VITE_API_TOKEN

function App() {

    const [location, setLocation] = useState([])
    const [load, setLoad] = useState(false)
    const [cityEvents, setCityEvents] = useState([])
    const [loadCityEvents, setLoadCityEvents] = useState(false)
    const [filteredCat, setFilteredCat] = useState(null)
    const [selectedCat, setSelectedCat] = useState(null)

    // Fetch the city to get Location
    useEffect(()=>{
      axios
      .get(
        `https://api.predicthq.com/v1/places/?q=Lyon,France`,
        {
          headers: {
            'Authorization': accessToken,
          },
        }
      )
      .then(res => res.data)
      .then(data => {
        console.log(data.results)
        setLocation(data.results[0].location);
        setLoad(true);
      })
      .catch((err)=>{
        console.log(err)
      })
        
    }, [])

    console.log(location);

  //fetch all events
  useEffect(()=>{
    if(load) {
      axios
      .get(
        `https://api.predicthq.com/v1/events/?within=2mi@${location[1]},${location[0]}`,
        {
          headers: {
            'Authorization': accessToken,
          },
        }
      )
      .then(res => res.data)
      .then(data => {
        console.log(data.results)
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
      <div>
        <CityEvents cityEvents={cityEvents} setFilteredCat={setFilteredCat} filteredCat={filteredCat} setSelectedCat={setSelectedCat} />
      </div>
  )
}

export default App
