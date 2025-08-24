
const Card = ({ value, type }) => {
  return (
    
<div  className="block w-full max-w-[180px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl ">
<h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900"><span className='text-blue-700 mr-1'>$</span>{value} </h5>
<p className="text-gray-700 text-xl font-medium">{ type }</p>
</div>

  )
}

export default Card