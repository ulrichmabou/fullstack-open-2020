import React from 'react'
import CountrySimple from './CountrySimple'
import CountryDetails from './CountryDetails'
import WeatherData from './WeatherData'

const Results = ({ searchResults, weatherData, handleButtonClick }) => {
    const resultsLength = searchResults.length

    if (resultsLength > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    else if (resultsLength <= 10 && resultsLength > 1) {
        return (
          <div>
            {searchResults.map((country) => (
              <div key={country.name}>
                  <CountrySimple country={country} 
                                 handleButtonClick={() => handleButtonClick(country)} />
              </div>
            ))}
          </div>
        )
    }
    else  {
        return (
            <div>
              {searchResults.map((country) => (
                <div key={country.name}>
                    <CountryDetails country={country} />
                </div>
              ))}

              <WeatherData weatherData={weatherData} />
            </div>
          )
    }
}

export default Results
