import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Results from './components/Results'
import axios from 'axios'


const App = () => {
    const [countries, setCountries] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [weatherData, setWeatherData] = useState(null)

    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
    const API_KEY = process.env.REACT_APP_API_KEY

    // Fetch countries data
    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(res => {
              setCountries(res.data)
          })
          .catch(err => {
              console.log(err)
          })
    }, [])
    
    // Fetch weather data
    useEffect(() => {
        if (searchResults.length === 1) {
            const capital = searchResults.map(country => country.capital)

            if (capital[0]) {
                const CITY = capital[0]
                const REQUEST_URL = `${BASE_URL}?q=${CITY}&?units=imperial3e&APPID=${API_KEY}`

                axios
                  .get(REQUEST_URL)
                  .then(res => {
                      setWeatherData(res.data)
                  })
                  .catch(err => {
                      console.log(err)
                  })

            }
        }
    }, [searchResults, API_KEY])

    useEffect(() => {
        const results = countries.filter(country => 
            country.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(results)
    }, [searchQuery, countries])

    
    const handleSearchQuery = e => setSearchQuery(e.target.value)

    const handleButtonClick = (country) => {
        setSearchResults([country])
    }  
    
    return (
        <div>
            <h1>Data for Countries</h1>
            <Filter searchQuery={searchQuery} 
                    handleSearchQuery={handleSearchQuery} 
            />
            <Results searchResults={searchResults} 
                     handleButtonClick={handleButtonClick}
                     weatherData={weatherData} 
            />
        </div>
    )
}

export default App