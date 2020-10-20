import React from 'react'

const Contact = ({ contact, onDel }) => {
    const handleDelClick = (id, name) => {
        if(onDel) {
            onDel(id, name)
        }
    }
    return (
        <div>
            {contact.name} {contact.number} <button onClick={handleDelClick.bind(null, contact.id, contact.name)}>delete</button>
        </div>
    )
}

export default Contact