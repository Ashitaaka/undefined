import CardEvent from "./CardEvent";
import "../css/CityEvents.css"

const CityEvents = ({cityEvents, setFilteredCat, filteredCat, setSelectedCat, selectedCity, selectedCountry, loadCityEvents}) => {


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
    <div className="events-page-header" >
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
      <div className="events-card-color-bg">
        <div className='events-cards-container'>
        {loadCityEvents && filteredCat.slice(0).reverse().map(event => (
          <CardEvent
            key={event.id}
            category={event.category}
            title={event.title}
            start={event.start}
            end={event.end}
            address={event.entities[0] && event.entities[0].formatted_address ? event.entities[0].formatted_address : "Address not available"}
          />
        ))}
          </div>
      </div>
    </div>
  );
};

export default CityEvents;