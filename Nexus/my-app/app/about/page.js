import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <div className="flex flex-col justify-center text-white h-1/2 items-center pt-10">
        <div className="flex justify-center items-center">
          <span><img className="rounded-full mr-5" src="/favicon.png" alt="" width={100} /></span>
          <span className="font-bold text-5xl text-center">Community</span>
        </div>
        <div className=" mt-10 text-center flex flex-col items-center">
          <p className="text-4xl font-bold w-[500px]">"Our Story: Pioneering Progress in Technology and Innovation"</p>
          <p className="text-xl mt-5 w-[700px]">Welcome to NEXUS, where innovation knows no bounds and creativity fuels our passion for making a difference in the world of technology and engineering.</p>
          
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 mt-10"></div>
      <div className="text-white flex flex-col items-center">
        <div className="container mx-auto">
          <h1 className="text-center mt-10 text-3xl font-bold">Our Goal</h1>
          <div className="text-center mt-5">
          Establishing a dedicated community committed to leveraging technology in order to address the challenges faced by both the CSE department and the college.
          </div>
        </div>
        

      </div>
    <div className="bg-white h-1 opacity-10 mt-10 w-full"></div>
    <div className="text-white flex flex-col items-center">
        <div className="container mx-auto">
          <h1 className="text-center mt-10 text-3xl font-bold">Our Tech Domains</h1>
          <div className="text-center mt-5">
          Proud to introduce to you the three tech domains of our club- Web Development, App Development and AI/ML.</div>
          <div className='text-center'>Feel free to join us and delve deep into these or other non technical domains.</div>
          <div className='text-center'>To know more click <Link className='underline text-blue-500' href={'/domains'}>here</Link></div>
        </div>
        

      </div>
    <div className="bg-white h-1 opacity-10 mt-10 w-full"></div>
        

    </>
  )
}

export default page