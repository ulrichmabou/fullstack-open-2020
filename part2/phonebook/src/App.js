import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notification, setNotification] = useState(null)

  // Get all contacts
  useEffect(() => {
      personService
        .getAll()
        .then(allContacts => {
          setPersons(allContacts)
        })
  }, [])

  useEffect(() => {
    const results = persons.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
}, [searchTerm, persons])

  // Add or update a contact
  const addPerson = e => {
      e.preventDefault()
      const personObject = {
          name: newName,
          number: newNumber
      }
      if (persons.filter(person => person.name === newName).length === 0) {
        personService
          .add(personObject)
          .then(response => {
            console.log(response)
          })
          .then(
            setNotification(`${newName} added to phonebook`)
          )
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        
      } else {
        const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        if (confirmUpdate) {
          const personToUpdate = persons.find(p => p.name === newName)
          const updatedPerson = { ...personToUpdate, number: newNumber }
          personService
            .update(updatedPerson.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id === response.id ? response : p))
              setNotification(`${newName}'s number updated`)
              setTimeout(() => {
                setNotification(null)
              }, 2000)
            })
            .catch(error => {
              setNotification(`the ${newName}'s contact was already deleted from server`)
              setTimeout(() => {
                setNotification(null)
              }, 2000)
              setPersons(persons)
            })
        }
      }
  }

  // Delete a contact
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((item) => item.id !== id))
          setNotification(`Deleted ${name}'s contact successfuly.`)
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => console.warn(error))
    }
  }

  const handleNameChange = e => setNewName(e.target.value)
  
  const handleNumberChange = e => setNewNumber(e.target.value)

  const handleSearch = e => {
      setSearchTerm(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h3>Add a new contact</h3>
      <ContactForm addPerson={addPerson} 
                   newName={newName} handleNameChange={handleNameChange} 
                   newNumber={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h3>Contacts</h3>
      <Contacts searchResults={searchResults} onDelete={handleDelete} />
    </div>
  )
}

export default App
