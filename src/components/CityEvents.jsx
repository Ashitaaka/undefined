import CardEvent from "./CardEvent"

const CityEvents = ({cityEvents}) => {
  return (
    <div className='events-page'>
      
      {cityEvents.map(el => ( 
        <div className='events-cards-container'>
          <CardEvent category={el.category} title={el.title} start={el.start} end={el.end} address={el.entities[0].formatted_address}/>
        </div>
        ))}
     

    </div>
  )
}

export default CityEvents