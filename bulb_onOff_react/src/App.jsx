import React, { useState } from 'react';
import bulbOff from '../src/assets/bulb-off.png'
import bulbOn from '../src/assets/bulb-on.png'

const App = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className={`h-screen w-full ${open ? 'bg-black/90' : 'bg-blue-50'} transition-all duration-300 `}>
      <h1 className={`py-10 text-center text-5xl font-bold mx-auto ${open ? 'text-white' : 'text-black'} `}> Bulb is { open ? 'On' : 'Off' } </h1>
      <div>
        <div className=' flex justify-center '>
         <img src={ open ? bulbOn :bulbOff} alt="buld" className='h-[500px] w-auto'  />
        </div>
        <div className='flex justify-center'>
          <button onClick={()=>setOpen(!open)} className={`px-10 py-3 text-xl cursor-pointer font-bold hover:scale-105 active:scale-95 transition-all duration-300 ${open ? "bg-white text-black" : 'bg-black text-white'} rounded-lg `}>{open ? 'Off' : 'On'}</button>
        </div>
      </div>
    </div>
  )
}

export default App