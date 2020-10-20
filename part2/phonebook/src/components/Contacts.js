import React from 'react'
import Contact from './Contact'

const Contacts = ({ searchResults, onDelete }) => {
    return (
      <div>
        {searchResults.map((person) => (
          <div key={person.name}>
            <Contact contact={person} onDel={onDelete} />
          </div>
        ))}
      </div>
    )
}

export default Contacts