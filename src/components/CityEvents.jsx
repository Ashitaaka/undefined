import axios from "axios";
import { useState, useEffect } from "react";
import CardEvent from "./CardEvent";
import "../css/CityEvents.css"

const accessUnsplashToken = import.meta.env.VITE_UNSPLASH_TOKEN

const CityEvents = ({cityEvents, setFilteredCat, filteredCat, setSelectedCat}) => {
  
  // Fetch unsplash images depending on the params

  const [cityImage, setCityImage] = useState(null) 

  useEffect(()=>{
    axios
    .get(
      `https://api.unsplash.com/search/photos?page=1&query=Lyon,France`,
      {
        headers: {
          'Authorization': accessUnsplashToken,
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
  }, [])

  // Creation of a new table to  get a category table from the events of the city
  const allCategories = [...new Set(cityEvents.map(cat => cat.category))];
  // Filters depending on the category
  const handleFilter = (category) => {
    if (category === "Select All") {
      setFilteredCat(cityEvents);
      setSelectedCat(null);
    } else {
    const filteredEvents = cityEvents.filter(event => event.category === category);
      setFilteredCat(filteredEvents);
      setSelectedCat(category);
    }
  };

  return (
  <div className='events-page'>
    <div className="events-page-header" style={cityImage && {backgroundImage: `url("${cityImage.full}")`}}>
      <div className="events-page-titles">
      <h1>Lyon</h1>
      <h2>France</h2>
    </div>
      <div className="filter-btn-container">
        <button key="Select All"
          className="filter-btn"
          onClick={() => handleFilter("Select All")}>Select All
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            className="filter-btn"
            onClick={() => handleFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
    
      <div className='events-cards-container'>
        {filteredCat && filteredCat.map(event => (
          <CardEvent key={event.id} category={event.category} title={event.title} start={event.start} end={event.end} address={event.entities[0].formatted_address}/>
        ))}
      </div>
    </div>
  );
};

export default CityEvents;