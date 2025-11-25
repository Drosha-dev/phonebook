import React from "react"

const PersonList = ({ persons, search, handleRemove }) => {


  return (

    <ul>

      {
        persons.filter(p => p.name.toLowerCase().includes(search)
          || search == '').map(p =>
            <React.Fragment key={p.id}>
            <><li>{p.name} {p.number}</li> 
              <button onClick={() => handleRemove(p.id, p.name)}>PUSH ME</button></>
              </React.Fragment>
              )
      }

    </ul>


  )
}


export default PersonList