

const PersonList = ({ persons, search, handleRemove }) => {


  return (

    <ul>

      {
        persons.filter(p => p.name.toLowerCase().includes(search)
          || search == '').map(p =>
            <><li key={p.id}>{p.name} {p.phoneNumber}</li> 
              <button onClick={() => handleRemove(p.id, p.name)}>PUSH ME</button></>)
      }

    </ul>


  )
}


export default PersonList