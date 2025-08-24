import React from 'react'

const Table = ({ value }) => {
  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-3 max-h-60 overflow-y-auto">
    <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                    Transactions
                </th>
            </tr>
        </thead>
        <tbody>
            { value.map((item, idx)=>(
              <tr key={idx}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    { idx + 1 }
                </th>
                <td className="px-6 py-4">
                    ${ item.amount }
                </td>
                <td className="px-6 py-4">
                    { item.transactions }
                </td>
            </tr>
            )) }
            
            
        </tbody>
    </table>
</div>

  )
}

export default Table