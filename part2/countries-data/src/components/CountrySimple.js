import React from 'react'

const CountrySimple = ({ country, handleButtonClick }) => {
    return (
    <div>
        {country.name} <button onClick={handleButtonClick}>
                        show
                       </button>
    </div>
    )
}

export default CountrySimple