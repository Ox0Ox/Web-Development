import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex mx-auto justify-between text-2xl bg-[rgb(18,18,18)] py-5 text-white'>
        <div className="logo">
            <span className='font-bold ml-5'>UTask</span>
        </div>
        <ul className="flex gap-8 mr-5">
            <li className='cursor-pointer hover:font-bold w-20 transition-all duration-[2000]'>Home</li>
            <li className='cursor-pointer hover:font-bold w-32 transition-all duration-[2000]'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar