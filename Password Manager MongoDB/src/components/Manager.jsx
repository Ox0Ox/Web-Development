import React, { useState, useEffect } from 'react';
import { MdEditNote, MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwords, setPasswords] = useState([]);
    const [showPassword, setShowPassword] = useState({});
    const [showEditPassword, setShowEditPassword] = useState(false); // State for edit password visibility
    const [editIndex, setEditIndex] = useState(null);

    const getpass = async() => {
        let req = await fetch('http://localhost:4000/');
        let passes = await req.json();
        setPasswords(passes);
        console.log(passes);
    }

    useEffect(() => {
        const fetchData = async () => {
            await getpass(); // Fetch initial passwords
        };
        
        fetchData(); // Fetch passwords on component mount
    
        const socket = new WebSocket('ws://localhost:4000');
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPasswords(data);
        };
        
        // Clean up on component unmount
        return () => socket.close();
    }, []);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleShowPassword = (index) => {
        setShowPassword((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handleShowEditPassword = () => {
        setShowEditPassword((prev) => !prev);
    };

    const handleSave = async () => {
        if (!form.site || !form.password) {
            toast.warn('URL and Password are required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
    
        const formattedUrl = form.site.startsWith('http://') || form.site.startsWith('https://')
            ? form.site
            : `http://${form.site}`;
    
        const newPassword = { ...form, site: formattedUrl };
    
        try {
            let res;
    
            if (editIndex !== null) {
                // Update existing password
                const idToUpdate = passwords[editIndex]._id;
                res = await fetch(`http://localhost:4000/${idToUpdate}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...newPassword,
                        // Ensure _id is not included
                    })
                });
            } else {
                // Save new password
                res = await fetch("http://localhost:4000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPassword)
                });
            }
    
            if (res.ok) {
                if (editIndex !== null) {
                    // Update state with edited password
                    const updatedPasswords = passwords.map((item, index) => index === editIndex ? newPassword : item);
                    setPasswords(updatedPasswords);
                    toast.success('Credential updated', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    // Add new password
                    setPasswords([...passwords, newPassword]);
                    toast.success('New credentials saved', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to save credentials');
            }
        } catch (error) {
            toast.error(`Failed to save credentials: ${error.message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    
        setForm({ site: '', username: '', password: '' });
        setShowEditPassword(false); // Reset edit password visibility
        setEditIndex(null); // Clear edit index after saving
    };

    const handleEdit = (index) => {
        const passwordToEdit = passwords[index];
        setForm(passwordToEdit);
        setEditIndex(index);
        setShowEditPassword(true); // Show edit password
    };

    const handleDelete = async (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this credential?');
        
        if (confirmDelete) {
            const deletePasswords = passwords.filter((_, i) => i === index);
            
            if (deletePasswords.length > 0) {
                const passtodelete = deletePasswords[0]._id;
                console.log('ID to delete:', passtodelete);
                
                const updatedPasswords = passwords.filter((_, i) => i !== index);
                
                try {
                    const res = await fetch(`http://localhost:4000/${passtodelete}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    });
                    
                    if (res.ok) {
                        setPasswords(updatedPasswords);
                        toast.info('Credential Deleted', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    } else {
                        throw new Error('Failed to delete credential');
                    }
                } catch (error) {
                    toast.error('Failed to delete credential', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            } else {
                console.error('No password item found to delete');
            }
        }
    };

    const handleKeyPress = (e, fieldName) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (fieldName === 'site') {
                document.getElementById('username').focus();
            } else if (fieldName === 'username') {
                document.getElementById('password').focus();
            } else if (fieldName === 'password') {
                handleSave();
            }
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Copied to Clipboard', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(() => {
                toast.warn('Failed to copy', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="container mx-auto my-5 w-[90%] bg-[rgb(45,45,45)] text-white rounded-xl p-5 h-[80vh]">
                <div className="addtask text-lg font-bold">
                    <h1 className='text-2xl'>Add Password</h1>
                    <div className="flex items-center mt-5 justify-between w-full">
                        <div className='w-3/4'>
                            <div>
                                <h1>URL</h1>
                                <input
                                    name="site"
                                    id="site"
                                    value={form.site}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => handleKeyPress(e, 'site')}
                                    className='rounded-xl p-1 text-black font-normal w-full'
                                    type="text"
                                    placeholder='Enter website URL' />
                            </div>
                            <div className='flex gap-5 mt-5'>
                                <div className='w-full'>
                                    <h1>Username</h1>
                                    <input
                                        name="username"
                                        id='username'
                                        value={form.username}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => handleKeyPress(e, 'username')}
                                        className='rounded-xl p-1 text-black font-normal w-full'
                                        type="text"
                                        placeholder='Enter Username' />
                                </div>
                                <div className='w-full'>
                                    <h1>Password</h1>
                                    <div className='relative flex items-center'>
                                        <input
                                            name="password"
                                            id='password'
                                            value={form.password}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => handleKeyPress(e, 'password')}
                                            className='rounded-xl p-1 text-black font-normal w-full'
                                            type={showEditPassword ? "text" : "password"}
                                            placeholder='Enter Password' />
                                        <span
                                            onClick={handleShowEditPassword}
                                            className='absolute right-2 text-black cursor-pointer'
                                        >
                                            {showEditPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-1/4 justify-center">
                            <button
                                onClick={handleSave}
                                className='disabled:hover:font-normal font-normal text-sm ml-3 px-3 py-2 bg-white text-black rounded-xl hover:font-bold w-14 transition-all duration-[2000]'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <h1 className='text-xl font-bold mt-5'>Your Passwords</h1>
                <div className="tasks my-2 h-[50%] overflow-x-auto mb-5">
                    {passwords.length === 0 ? (
                        <div className='h-full flex items-center justify-center'>No passwords saved yet, add passwords</div>
                    ) : (
                        <>
                            <div className="flex justify-between font-bold mb-2">
                                <div className='w-1/4'>URL</div>
                                <div className='w-1/4'>Username</div>
                                <div className='w-1/4'>Password</div>
                                <div className='w-1/4 pl-20'>Actions</div>
                            </div>
                            {passwords.map((item, index) => (
                                <div key={index} className="buttons flex justify-between items-center my-2">
                                    <div className='w-1/4 flex justify-between items-center pr-10'>
                                        <a
                                            href={item.site}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='hover:underline'
                                        >
                                            {item.site}
                                        </a>
                                        <div className='cursor-pointer' onClick={() => handleCopy(item.site)}>
                                            <FaCopy />
                                        </div>
                                    </div>
                                    <div className='w-1/4 flex justify-between items-center pr-10'>
                                        {item.username}
                                        <div className='cursor-pointer' onClick={() => handleCopy(item.username)}>
                                            <FaCopy />
                                        </div>
                                    </div>
                                    <div className='w-1/4 flex items-center justify-between pr-10'>
                                        <span>{showPassword[index] ? item.password : "••••••••"}</span>
                                        <div className='flex'>
                                            <span className='cursor-pointer' onClick={() => handleCopy(item.password)}>
                                                <FaCopy />
                                            </span>
                                            <span
                                                onClick={() => handleShowPassword(index)}
                                                className='cursor-pointer ml-2'
                                            >
                                                {showPassword[index] ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex w-1/4 pl-20">
                                        <button
                                            className='flex justify-center items-center font-normal text-sm mx-2 my-2 px-3 py-1 bg-white text-black rounded-xl hover:font-bold w-20 transition-all duration-[2000]'
                                            onClick={() => handleEdit(index)}
                                        >
                                            <MdEditNote className='text-2xl' /><div className="btntext"> Edit</div>
                                        </button>
                                        <button
                                            className='flex justify-center items-center font-normal text-sm mx-2 my-2 px-3 py-1 bg-white text-black rounded-xl hover:font-bold w-24 transition-all duration-[2000]'
                                            onClick={() => handleDelete(index)}
                                        >
                                            <MdDelete className='text-2xl' /><div className="btntext"> Delete</div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manager;