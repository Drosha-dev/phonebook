import { useState,useEffect } from 'react'
import './App.css'
import Filter from '../components/Filter'
import AddPersonForm from '../components/addPersonForm'
import PersonList from '../components/PersonList'
import phoneService from './services/phonebook'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchParam, setSearchParam] = useState('')


  useEffect(() => {
    phoneService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  }

  const addPersons = (e) => {
    e.preventDefault();

    const personFound = persons.find((e) => e.name == newName)
    if (personFound !== undefined) {
      alert(`${newName} has already been added`);
      setNewName('')
      setNewPhoneNumber('')
    } else {
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
        id: String(persons.length + 1)
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhoneNumber('')
    }
  }

  const handleSearch = (e) => {
    setSearchParam(e.target.value.toLowerCase());

  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        Search: <Filter search={handleSearch} />
        <AddPersonForm persons={addPersons} newName={newName} fullNameChange={handleNameChange} phoneNumber={newPhoneNumber} phoneNumberChange={handlePhoneNumberChange} />
        <h1>Numbers</h1>
        <PersonList persons={persons} search={searchParam} />
        {/* <ul>

          {
            persons.filter(p => p.name.toLowerCase().includes(searchParam) || searchParam == '').map(p => <li key={p.id}>{p.name}{p.phoneNumber}</li>)
          }          
          
        </ul> */}
      </div>
    </>
  )
}

export default App
