import React from 'react'

const Filter = ({ searchTerm, handleSearch}) => {
    return (
        <div>
          Search contact <input 
                                type="text"
                                placeholder="..."
                                value={searchTerm} 
                                onChange={handleSearch} 
                         />
      </div>
    )
}

export default Filter