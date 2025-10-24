

const AddPersonForm =({persons, fullNameChange, phoneNumberChange, newName, phoneNumber}) => {
    
    
    return(
       <form onSubmit={persons}>
          <h1>Add a new </h1>
          <div>
            name:
            <input value={newName}
              onChange={fullNameChange}
            />
          </div>
          <div>
            phonenumber:
            <input value={phoneNumber}
              onChange={phoneNumberChange}
            />
          </div>
          <div>
            <button type='submit'>add</button>
          </div>
        </form>
    )
}

export default AddPersonForm