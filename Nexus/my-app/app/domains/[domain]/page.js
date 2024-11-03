import React from 'react'
import descer from '@/config/desc'

const domains = ({params}) => {
    const teamData = descer.find(team => team.slug === params.domain);
    return (
        <div>
            {teamData ? (
                <>
                    <h1 className='text-4xl font-bold m-2'>{teamData.team}</h1>
                    <p className='m-2 text-xl'>{teamData.description}</p>
                </>
            ) : (
                <div className="flex h-svh items-center justify-center relative bottom-20">
        <div className="text-center p-6 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="mt-4 text-gray-700">Sorry, the page you're looking for does not exist.</p>
        </div>
      </div>
            )}
        </div>
    );
}

export default domains