import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[rgb(45,45,45)] text-white flex px-5 justify-between items-center h-14'>
        <div className="logo font-bold text-xl">PassOP</div>
        <ul className='flex gap-5'>
            <li className='hover:font-bold w-20 transition-all duration-[2000]'><a  href="/">Home</a></li>
            <li className='hover:font-bold w-20 transition-all duration-[2000]'><a  href="/about">About</a></li>
            <li className='hover:font-bold w-28 transition-all duration-[2000]'><a  href="/contact">Contact Us</a></li>
        </ul>
    </nav>
  )
}

export default Navbar