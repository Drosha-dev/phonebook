import { useState, useEffect } from 'react'
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
  },[])

  // not sure about these feel a bit outdated
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
//see handleNameChange
  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  }

  const addPersons = (e) => {
    e.preventDefault();
    
    //finds person with same name
    const personFound = persons.find((e) => e.name == newName);
    // if found and user wants updates with new object through phoneservice update
    if (personFound !== undefined) {
      if(window.confirm(`${newName} has already been added. Do you want to update users Phone Number?`)){
        
        const updatededPersonObject = {
        id: personFound.id,
        name: newName,
        phoneNumber: newPhoneNumber
        
       }
       //updates db with new number then loops through the old array 
         phoneService.update(personFound.id,updatededPersonObject).then((updatedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                //if persons id does not match keep same, if it does match replace that persons data with new updated data
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
         
         })
       }
      setNewName('')
      setNewPhoneNumber('')
    } else {
      const personObject = {
        id: String(persons.length + 1),
        name: newName,
        phoneNumber: newPhoneNumber
        
      }
      phoneService.create(personObject).then(response => {
        setPersons(prevPersons =>([...prevPersons, response]))
        setNewName('')
        setNewPhoneNumber('')
      })

    }
  }
  const handleRemove= (id,name) => {
   
    if(window.confirm(`Do you want to Delete ${name}`)) {
      phoneService.remove(id).then(response => {
        setPersons(prevPersons => prevPersons.filter(p => p.id !== id));
        console.log("deleted successfully", response.data);
        
      })
    }
      
    // phoneService.remove(e.id).then(response => {
    //   console.log(`deleted ${e.name}`,response.status);
      
    // })
    // .catch(error => {
    //   console.error("error deleting", error);
    // })
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
        <PersonList persons={persons} search={searchParam} handleRemove={handleRemove} />
      </div>
    </>
  )
}

export default App
