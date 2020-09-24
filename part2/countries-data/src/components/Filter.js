import React from 'react'

const Filter = ({ searchQuery, handleSearchQuery }) => {
    return (
        <div>
            Find countries <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchQuery}
                           />
        </div>
    )
}

export default Filter