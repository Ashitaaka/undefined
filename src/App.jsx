import { useState, useEffect} from 'react'
import './App.css'
import axios, { Axios } from 'axios'

//importing components
import SearchBar from './components/SearchBar'


const accessToken = import.meta.env.VITE_API_TOKEN

function App() {

    const [location, setLocation] = useState([])
    const [load, setLoad] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

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

    console.log(location);

  //fetch all events
  useEffect(()=>{
    if(load) {
      axios
      .get(
        `https://api.predicthq.com/v1/events/?within=1mi@${location[1]},${location[0]}`,
        {
          headers: {
            'Authorization': accessToken,
          },
        }
      )
      .then(res => res.data)
      .then(data => console.log(data.results))
      .catch((err)=>{
        console.log(err)
      })
    }  
  }, [location])

  console.log(location);

  return (
      <div className='home-page'>
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
      </div>
  )
}

export default App
