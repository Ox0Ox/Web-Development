import React from 'react';
import Link from 'next/link';
import descer from '@/config/desc';

const Domains = ({ params }) => {
    const teamData = descer.find(team => team.slug === params.domain);

    return (
        <div>
            {teamData ? (
                <>
                    <div>
                        <h1 className='text-4xl font-bold p-10'>{teamData.team}</h1>
                        <p className='mx-10 text-xl'>{teamData.description}</p>

                        <div className='flex gap-4 mt-8 mx-10'>
                            <Link href={`/forum/${params.domain}`} passHref>
                                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'>
                                    Go to Forum
                                </button>
                            </Link>
                            <Link href={`/projects/${params.domain}`} passHref>
                                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'>
                                    View Projects
                                </button>
                            </Link>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200'>
                                    Apply Now
                            </button>
                        </div>
                    </div>
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

export default Domains;
