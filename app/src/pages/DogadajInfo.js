import React from 'react'


const DogadajInfo = ({dogadaj,brisiDogadaj}) => {

  return (
    <div>
    <table>
      <tbody>
      <tr>
      <th>IME DOGADAJA</th>
      <th>DATUM</th>
    </tr>
  <tr>
    <td>{dogadaj.ime_natjecanja}</td>
    <td>{dogadaj.datum}</td>
    <td> <button className="manji" onClick={brisiDogadaj}><span role="img" aria-label="delete">❌</span></button> </td>
  </tr>
  </tbody>
  </table>
  
  
  </div>
  
  )
}

export default DogadajInfo