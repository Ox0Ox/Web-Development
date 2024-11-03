import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
        <div className="container mx-auto p-4">
        <h1 className='text-4xl font-bold mb-10 mt-5 text-center'>Technical Domains</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <Link href={'/domains/webdev'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/web.jpg" alt="Web" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Web Development</div>
          </div></Link>
          <Link href={'/domains/appdev'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/app.png" alt="app" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">App Development</div>
          </div></Link>
          <Link href={'/domains/aiml'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/aiml.jpeg" alt="AIML" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Artificial Intelligence and Machine Learning</div>
          </div></Link>
        </div>
        <h1 className='text-4xl font-bold mb-10 text-center mt-10'>Non-Technical Domains</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
          <Link href={'/domains/logistics'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/logistics.jpg" alt="logistics" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Logsitics</div>
          </div></Link>
          <Link href={'/domains/market'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/marketing.jpg" alt="market" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Marketing</div>
          </div></Link>
          <Link href={'/domains/content'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/content.webp" alt="content" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Content Creation</div>
          </div></Link>
          <Link href={'/domains/event'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/event.jpg" alt="event" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Event Planning</div>
          </div></Link>
        </div>
      </div>
    </>
  )
}

export default page