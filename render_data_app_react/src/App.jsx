import React from 'react'
import { complex, data, list, name, obj } from './data/data'

const App = () => {
  return (
    <div>
      <h1> { name } </h1>
       <h1>{obj.name}</h1>

       <div className='firstDiv'>
        { data.map((item, idx)=>(
          <span key={idx}>{item}</span>
        )) }
       </div>

       <div>
        { list.map((item, idx)=>(
          <h1 key={idx}> <span>0{idx+1}-</span> { item.name }</h1>
        )) }
       </div>
       <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Job one</th>
            <th>Job Two</th>
          </tr>
        </thead>
        <tbody>
          { complex.map((data, idx)=>(
            <tr>
              <td>{idx + 1}</td>
              <td>{data.company}</td>
              <td>{data.jobs[0]}</td>
              <td>{data.jobs[1]}</td>
            </tr>
          )) }
        </tbody>
       </table>

    </div>
  )
}

export default App