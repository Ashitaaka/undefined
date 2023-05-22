import { useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

//importing components
import SearchBar from './components/SearchBar';
import CityEvents from './components/CityEvents';

const accessToken = process.env.VITE_API_TOKEN;
const accessUnsplashToken = process.env.VITE_UNSPLASH_TOKEN;


function App() {

    const [location, setLocation] = useState([]);
    const [load, setLoad] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cityEvents, setCityEvents] = useState([])
    const [loadCityEvents, setLoadCityEvents] = useState(false)
    const [filteredCat, setFilteredCat] = useState([])
    const [selectedCat, setSelectedCat] = useState(null)
    const [arrivalDate, setArrivalDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [cityField, setCityField] = useState("");
    const [cityTitle, setCityTitle] = useState("");
    const [countryTitle, setCountryTitle] = useState("");

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
    }, [selectedCity, arrivalDate && returnDate])


  //fetch all events
  useEffect(()=>{
    if(load && arrivalDate && returnDate) {
      axios
      .get(
        `https://api.predicthq.com/v1/events?category=conferences,expos,concerts,festivals,performing-arts,community,sports&within=40km@${location[1]},${location[0]}&active.gte=${arrivalDate}&active.lte=${returnDate}&limit=50`,
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
        setCityTitle(cityField);
        setCountryTitle(selectedCountry.label);
        // setCityField("");
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
          setCityImage(data.results[0].urls);
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }, [loadCityEvents, selectedCity, accessUnsplashToken])

  

  return (
      <div className='home-page'>
      <div className={(selectedCity.length > 1 && loadCityEvents === false && arrivalDate && returnDate) && cityImage === null? 'loading page-active' :'loading page-hide' }>
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
        <div 
        className={filteredCat.length === 0 ? "container-center" : "container" } 
        style={cityImage && selectedCity ? {backgroundImage: `url("${cityImage.full}")`} 
        : {backgroundImage: `url("https://www.pixel4k.com/wp-content/uploads/2019/09/etretat-normandie-france_1569187797.jpg.webp")`}}
        >
          <div className='title'>
            <h1 className='home-title'>{cityTitle==="" ? "Undefined" : cityTitle}</h1>
            <h2 className='home-subtitle'>{countryTitle==="" ? "Travel" : countryTitle}</h2>
          </div>
          <SearchBar 
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          setArrivalDate={setArrivalDate}
          setReturnDate={setReturnDate}
          cityField={cityField}
          setCityField={setCityField}
          />
        </div>

        {loadCityEvents ?  
        <CityEvents selectedCity={selectedCity} selectedCountry={selectedCountry} cityEvents={cityEvents} 
        setFilteredCat={setFilteredCat} filteredCat={filteredCat} setSelectedCat={setSelectedCat} 
        loadCityEvents={loadCityEvents} /> : <></>}

      </div>
  )
}


export default App
