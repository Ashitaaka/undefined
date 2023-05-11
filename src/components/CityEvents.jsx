import CardEvent from "./CardEvent"

const CityEvents = ({cityEvents}) => {
  return (
    <div className='events-page'>
      
      {cityEvents.map(el => ( 
          <CardEvent key={el.id} category={el.category} title={el.title} start={el.start} end={el.end} address={el.entities[0].formatted_address}/>
        ))}
     

    </div>
  )
}

export default CityEvents