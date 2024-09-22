'use client'
import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './getCroppedImg'; // Adjust path if needed
import { FaTags } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { CiSquarePlus } from "react-icons/ci";
import { IoFileTrayFullOutline } from "react-icons/io5";

const Dashboard = () => {
  const [bannerFile, setBannerFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]); // Array to store multiple file names
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [roles, setRoles] = useState('');
  const [tags, setTags] = useState('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Loading state
  const [fetchfile, setfetchfile] = useState([]);
  const [showfile, setshowfile] = useState(false);
  const [uploadingfiles, setuploadingfiles] = useState([])


  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/user-profile/${session.user.id}`); // Fetch data for the logged-in user
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        console.log(data);

        // Map fetched data to the state
        setBannerFile(data.banner || null);
        setRoles(data.roles || '');
        setTags(data.tags || '');
        setCroppedImage(data.banner || null); // Set the cropped image as the banner
        setfetchfile(data.uploadedFile || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (session?.user?.id) {
      fetchDashboardData(); // Fetch data only if user session is available
    }
  }, [session?.user?.id], [showfile]); // Only run effect when user session ID is available

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerFile(imageUrl);
      setImage(imageUrl);
      setCropping(true); // Start cropping after upload
    }
  };

  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setBannerFile(croppedImg); // Update the banner file with the cropped image
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const closeCropper = () => {
    setCropping(false);
  };

  const startCropping = () => {
    setCropping(true);
  };

  const clearBanner = () => {
    setBannerFile(null);
    setCroppedImage(null);
    setImage(null);
    if (image) {
      URL.revokeObjectURL(image); // Revoke the object URL to free memory
    }
  };

  const handleFileUploadForFiles = (e) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFile(prevFiles => [...prevFiles, ...fileNames]); // Append new files to existing ones
      console.log('Selected files for upload:', fileNames); // Log file names
  
      console.log('THESE ARE THE FILES', files);
      for (let file of files) {
        const reader = new FileReader();
        
        // When the file is read successfully, the result will be the data URL
        reader.onloadend = () => {
          const dataUrl = reader.result; // This will be the data URL of the file
          console.log('Data URL:', dataUrl);
  
          // Update the state with the new data URL
          setuploadingfiles(prevFiles => [...prevFiles, dataUrl]);
        };
        
        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }
  };
  

  const handleUpdate = async (e) => {
    const file = e.target.files;
    console.log(e.target.files);
    // if (file) {
    //   const imageUrl = URL.createObjectURL(file); // Start cropping after upload
    // }
  // };
    try {
      const userId = session?.user?.id; // Replace with actual user ID from session or context
  
      // Step 1: Fetch current user data to get previously uploaded files
      const currentUserResponse = await fetch(`/api/user-profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!currentUserResponse.ok) {
        throw new Error(`Failed to fetch current user data: ${currentUserResponse.statusText}`);
      }
  
      const currentUserData = await currentUserResponse.json();
      const currentUploadedFiles = currentUserData?.uploadedFile || []; // Retrieve the current uploaded files array
  
      // Step 2: Append the new files to the existing ones
      const updatedFiles = [...currentUploadedFiles, ...uploadingfiles]; // Assuming uploadedFile is the new array of files
  
      // Step 3: Construct the payload
      const payload = {
        id: userId,
        banner: croppedImage || bannerFile,
        roles,
        tags,
        uploadedFile: updatedFiles,  // Send the combined array
      };
  
      // Step 4: Send the updated data to the server
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('User data updated successfully:', result);
  
      // Reset uploaded files after update
      setUploadedFile([]);
    } catch (error) {
      console.error('Error updating dashboard data:', error);
    }
  };
  
  const viewfile = () =>{
    setshowfile(!showfile);
  };
  

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
      <div className="relative w-full h-96">
        <div className="cover w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 hover:opacity-80 cursor-pointer">
            {bannerFile ? 'Change Banner' : 'Add Banner'}
          </span>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
            id="bannerUpload"
          />
        </div>
        <label htmlFor="bannerUpload" className="absolute inset-0">
          <div className="absolute inset-0 cursor-pointer" />
        </label>
        {bannerFile && (
          <>
            <img src={bannerFile} alt="Banner Preview" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <label htmlFor="bannerUpload" className="bg-gray-700 text-white px-2 py-1 rounded cursor-pointer">
                Change
              </label>
              <button
                onClick={startCropping}
                className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Crop
              </button>
              <button
                onClick={clearBanner}
                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Clear
              </button>
            </div>
          </>
        )}

        {cropping && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="absolute w-1/3 h-3/4 bg-white rounded-lg p-4">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1308 / 384} // Aspect ratio for banner
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
              <button
                onClick={closeCropper}
                className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <div className="w-1/2 m-4">
          <h1 className="text-white mb-2">Mention your role/roles</h1>
          <input
            className="w-full p-2 rounded-xl"
            type="text"
            placeholder="Ex: Artist, Designer, Writer"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
          />
        </div>
        <div className="w-1/2 m-4">
          <h1 className="text-white mb-2 flex items-center">
            Mention tags &nbsp;<FaTags />
          </h1>
          <input
            className="w-full p-2 rounded-xl"
            type="text"
            placeholder="Ex: Art, Design, Essay"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <div className='flex text-white justify-around w-full items-center'>
          <div className='flex flex-col items-center'>
            <label htmlFor="fileUpload" className="cursor-pointer">
              <div className="w-40 h-40 bg-gray-500 rounded-lg flex flex-col items-center justify-center text-white font-bold hover:bg-gray-600">
                <div className='p-2'>Upload Files</div>
                <div className='text-white text-3xl'><CiSquarePlus /></div>
              </div>

              <input
                type="file"
                accept="*"
                multiple  // Allow multiple file selection
                style={{ display: 'none' }}
                id="fileUpload"
                onChange={handleFileUploadForFiles}
              />

            </label>

            {uploadedFile.length > 0 && (
              <ul className="text-white mt-2">
                {uploadedFile.map((file, index) => (
                  <li key={index}>Uploaded File: {file}</li>
                ))}
              </ul>
            )}
          </div>
          <div><label onClick={viewfile} className="cursor-pointer">
            <div className="w-40 h-40 bg-gray-500 rounded-lg flex flex-col items-center justify-center text-white font-bold hover:bg-gray-600">
              <div className='text-center p-2'>Files</div>
              <div className='text-white text-3xl'><IoFileTrayFullOutline /></div>
            </div>
          </label></div>
        </div>

        <button
          onClick={handleUpdate}
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md mb-5"
        >
          Update Dashboard
        </button>
      </div>
    </>
  );
};

export default Dashboard;
