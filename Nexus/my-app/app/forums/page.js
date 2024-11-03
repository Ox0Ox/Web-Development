import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
    <h1 className='text-4xl font-bold mb-10 pt-5 text-center'>Forums</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <Link href={'/forums/webdev'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/web.jpg" alt="Web" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Web Development</div>
          </div></Link>
          <Link href={'/forums/appdev'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/app.png" alt="app" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">App Development</div>
          </div></Link>
          <Link href={'/forums/aiml'}><div className="carder hover:cursor-pointer hover:bg-blue-800 duration-300 bg-blue-950 rounded-xl p-4 text-center">
            <img src="/aiml.jpeg" alt="AIML" className="mx-auto mb-3 h-52 w-full" />
            <div className="text-white text-xl">Artificial Intelligence and Machine Learning</div>
          </div></Link>
        </div>
        </>
  )
}

export default page