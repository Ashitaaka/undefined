import { useState, useEffect} from 'react'
import './App.css'
import axios, { Axios } from 'axios'

function App() {

    const [location, setLocation] = useState([])
    const [load, setLoad] = useState(false)

    // Fetch the city to get Location
    useEffect(()=>{
      axios
      .get(
        `https://api.predicthq.com/v1/places/?q=Lyon,France`,
        {
          headers: {
            'Authorization': 'Bearer dgAymuvY_lHHAtMWAWpwkjWcULBFrLHHLgm4-PAI',
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

  //fetch all events
  useEffect(()=>{
    if(load) {
      axios
      .get(
        `https://api.predicthq.com/v1/events/?within=2mi@${location[1]},${location[0]}`,
        {
          headers: {
            'Authorization': 'Bearer dgAymuvY_lHHAtMWAWpwkjWcULBFrLHHLgm4-PAI',
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

  return (
      <div>

      </div>
  )
}

export default App
