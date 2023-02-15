import axios from 'axios'
import { useEffect, useState } from 'react'
import getRandomLocation from './utils/getRandomLocation'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/${numberLocation}`)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [numberLocation])

  const handleSubmit = e => {
    e.preventDefault()
    if(e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation())
    }else {
    setNumberLocation(e.target.inputLocation.value.trim())
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  return (
    <div className="app">
      <h1 className='app_title'>Rick and Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input className='form_input' id='inputLocation' type="text" />
        <button className='form_btn'>Search</button>
      </form>
      {
        hasError ?
          <h2 className='app_error'>❌ Hey! you must provide an id from 1 to 126 🥺</h2>
          :
          <>
            <LocationInfo location={location} />
            <div className='residents_container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default App
