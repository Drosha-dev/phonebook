

const PersonList = ({persons, search}) => {


    return(
        <ul>

          {
            persons.filter(p => p.name.toLowerCase().includes(search) || search == '').map(p => <li key={p.id}>{p.name}{p.phoneNumber}</li>)
          }          
          
        </ul>
    )
}


export default PersonList