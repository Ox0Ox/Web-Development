'use client'
import React, { useEffect, useState } from 'react';
import { FaTags } from "react-icons/fa";
import { IoFileTrayFullOutline } from "react-icons/io5";

const Username = ({ params }) => {
  const [bannerFile, setBannerFile] = useState(null);
  const [roles, setRoles] = useState('');
  const [tags, setTags] = useState('');
  const [croppedImage, setCroppedImage] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [showfile, setshowfile] = useState(false);
  const [fetchfile, setfetchfile] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`/api/dashboardload/${params.username}`);
        if (response.status === 404) {
          setUserNotFound(true);
          setLoading(false); // End loading
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        console.log(data);

        setBannerFile(data.banner || null);
        setRoles(data.roles || 'Creating animations');
        setTags(data.tags || 'Art, animation');
        setfetchfile(data.uploadedFile || []); // Ensure it's an array
        if (data.image === 'cleared') {
          setCroppedImage(null);
        } else {
          setCroppedImage(data.image);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (params.username) {
      fetchDashboardData();
    }
  }, [params.username]);

  const viewfile = () =>{
    setshowfile(!showfile);
  };

  if (userNotFound) {
    return (
      <div className='flex justify-center items-center h-screen relative bottom-20'>
        <h1 className='text-4xl text-gray-700'>OOPS, User Not Found, try another?</h1>
      </div>
    );
  }

  if (showfile) {
    return (
      <>
        <ul className="text-white mt-2">
          {fetchfile.map((file, index) => (
            <li key={index}>
              {/* Download button for each file */}
              <a href={file} download={`file_${index}`} className="text-white">
                <button className="text-white">
                  Download File {index + 1}
                </button>
              </a>
            </li>
          ))}
        </ul>
        <button className="text-white" onClick={viewfile}>
          Go Back :D
        </button>
      </>
    );
  }

  // Show loading component if data is still being fetched
  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen relative bottom-20'>
        <h1 className='text-3xl text-gray-700'>Loading...</h1>

        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>

      </div>
    );
  }

  return (
    <>
      <div className='cover w-full relative flex flex-col justify-center items-center'>
        {/* Banner */}
        <img
          id='banner'
          className='object-cover w-full h-96'
          src={bannerFile || "https://c7.alamy.com/comp/GBB2YJ/blank-banner-icon-GBB2YJ.jpg"}
          alt="User banner"
        />
        
        {/* Profile Image */}
        <img
          id='croppic'
          className='rounded-full relative bottom-20'
          src={croppedImage || "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
          alt="User profile"
          width={125}
        />
        
        {/* Username */}
        <div className='text-white relative bottom-20 mt-2'>
          @{params.username}
        </div>
        
        {/* Roles */}
        <div id='roles' className='text-gray-400 relative bottom-20 mt-2'>
          {roles}
        </div>
        
        {/* Tags */}
        <div id='tags' className='text-gray-400 relative bottom-20 mt-2 flex justify-center items-center'>
          Tags &nbsp;<FaTags />&nbsp; - {tags}
        </div>
        
        {/* Placeholder stats */}
        <div className='text-gray-400 relative bottom-20 mt-2'>
          9719 members, 82 posts, $1500/release
        </div>

        <div><label onClick={viewfile} className="cursor-pointer">
            <div className="w-40 h-40 bg-gray-500 rounded-lg flex flex-col items-center justify-center text-white font-bold hover:bg-gray-600 relative bottom-20 mt-5">
              <div className='text-center p-2'>View work</div>
              <div className='text-white text-3xl'><IoFileTrayFullOutline /></div>
            </div>
          </label></div>

        <div className="divisions flex relative bottom-20 mt-5 w-full h-96">
          {/* Supporters section */}
          <div className="support bg-slate-900 rounded-xl w-1/2 m-5 text-white overflow-x-auto">
            <div className='messages p-10'>
              <h2 className='text-2xl font-bold'>Supporters</h2>
              <ul className='p-5'>
                <li>Shubham Donated</li>
                <li>Shubham Donated</li>
                <li>Shubham Donated</li>
                <li>Shubham Donated</li>
                <li>Shubham Donated</li>
                <li>Shubham Donated</li>
                <li>Shubham Donated</li>
              </ul>
            </div>
          </div>

          {/* Payment section */}
          <div className="pay bg-slate-900 rounded-xl w-1/2 m-5 text-white">
            <div className='p-10'>
              <h2 className='text-2xl font-bold'>Make a Payment</h2>
              <div className="amount flex items-center">
                <input
                  className='bg-slate-800 w-3/4 mt-5 rounded-lg p-2'
                  type="text"
                  placeholder='Enter Amount'
                />
                <button
                  type="button"
                  className="mt-5 ml-2 h-10 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 text-center"
                >
                  Pay
                </button>
              </div>
              <h2 className='text-xl font-bold mt-10'>Quick Pay</h2>
              <div className="amount flex">
                <button className='bg-slate-700 mt-5 rounded-lg p-2 ml-2'>Pay $10</button>
                <button className='bg-slate-700 mt-5 rounded-lg p-2 ml-2'>Pay $20</button>
                <button className='bg-slate-700 mt-5 rounded-lg p-2 ml-2'>Pay $30</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
