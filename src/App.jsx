import { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

//importing components
import SearchBar from './components/SearchBar';
import CityEvents from './components/CityEvents';

const accessToken = import.meta.env.VITE_API_TOKEN;
const accessUnsplashToken = import.meta.env.VITE_UNSPLASH_TOKEN;


function App() {

    const [location, setLocation] = useState([]);
    const [load, setLoad] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cityEvents, setCityEvents] = useState([]);
    const [loadCityEvents, setLoadCityEvents] = useState(false);
    const [filteredCat, setFilteredCat] = useState([]);
    const [selectedCat, setSelectedCat] = useState(null);


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
          setLocation(data.results[0]?.location);
          setLoad(true);
        })
        .catch((err)=>{
          console.log(err)
        })
      } 
    }, [selectedCity, selectedCountry])


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
  }, [load, location])

  //fetch images
  const [cityImage, setCityImage] = useState(null) 

  useEffect(()=>{
    if (loadCityEvents && selectedCity) {
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=1&query=${selectedCity}`,
          {
            headers: {
              'Authorization': `Client-ID ${accessUnsplashToken}`,
            },
          }
        )
        .then(res => res.data)
        .then(data => {
          console.log(data.results[0].urls);
          setCityImage(data.results[0].urls);
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }, [loadCityEvents, selectedCity, accessUnsplashToken])
console.log(cityImage);
console.log(selectedCity);

  return (
    <div className='home-page' style={cityImage && selectedCity ? {backgroundImage: `url("${cityImage.full}")`} 
    : {backgroundImage: `url("https://www.pixel4k.com/wp-content/uploads/2019/09/etretat-normandie-france_1569187797.jpg.webp")`}}>
        <div className={filteredCat.length === 0 ? "container-center" : "container" } >
          <div className='title'>
            <h1 className='home-title'>{!selectedCity ? "Undefined" : selectedCity}</h1>
            <h2 className='home-subtitle'>{!selectedCountry ? "Travel" : selectedCountry.label}</h2>
          </div>
          <SearchBar 
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          />
        </div>

        <CityEvents selectedCity={selectedCity} selectedCountry={selectedCountry} cityEvents={cityEvents} setFilteredCat={setFilteredCat} filteredCat={filteredCat} setSelectedCat={setSelectedCat} loadCityEvents={loadCityEvents} />

      </div>
  )
}


export default App
