"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
    const [showdrop, setshowdrop] = useState(false)
    return (
        <>
            
            <nav className='flex justify-between bg-blue-950/60 backdrop-blur text-white py-3 sticky top-0 z-10 items-center'>
                <Link href={'/'}>
                <div className='flex items-center justify-center ml-10 '>
                    <img className='rounded-full mr-2' src="/favicon.png" alt="" width={50} />
                    <div className="logo text-2xl font-bold italic">Nexus</div>
                </div>
                </Link>
                <ul className='flex mr-10 text-lg justify-center items-center'>
                    <li className='hover:cursor-pointer hover:font-bold duration-200 w-20 text-center'><Link href={'/'}>Home</Link></li>
                    <li className='hover:cursor-pointer hover:font-bold duration-200 w-20 text-center'><Link href={'/about'}>About</Link></li>
                    <li className='hover:cursor-pointer hover:font-bold duration-200 w-24 text-center'><Link href={'/domains'}>Domains</Link></li>
                    <li className='hover:cursor-pointer hover:font-bold duration-200 w-24 text-center'><Link href={'/projects'}>Projects</Link></li>
                    <li className='ml-2 hover:cursor-pointer hover:font-bold duration-200 w-20 text-center'><Link href={'/login'}><button type="button" className="text-white w-24 text-lg bg-gradient-to-br duration-200 hover:font-bold from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">Login</button></Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar