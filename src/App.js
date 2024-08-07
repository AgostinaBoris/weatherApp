import React, { useState } from 'react'
import axios from 'axios'


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5c40d9fea74ec10a9a6be57f841c7f8e`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const kelvinToCelsius = (kelvin) =>{
    return (kelvin - 273.15).toFixed(1)
  }

  return (
    <div className="app">
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'

        />
      </div>


      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{kelvinToCelsius(data.main.temp)}ºC</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{kelvinToCelsius(data.main.feels_like)}ºC</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
          </div>
          <div className='wind'>
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
