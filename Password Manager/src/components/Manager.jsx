import React, { useState, useEffect } from 'react';
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwords, setPasswords] = useState(JSON.parse(localStorage.getItem('passwords')) || []);
    const [showPassword, setShowPassword] = useState({});
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passwords));
    }, [passwords]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleShowPassword = (index) => {
        setShowPassword((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handleSave = () => {
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

        // Ensure URL starts with http:// or https://
        const formattedUrl = form.site.startsWith('http://') || form.site.startsWith('https://')
            ? form.site
            : `http://${form.site}`;

        const newPassword = { ...form, site: formattedUrl };

        if (editIndex !== null) {
            const updatedPasswords = passwords.map((item, index) =>
                index === editIndex ? newPassword : item
            );
            setPasswords(updatedPasswords);
            setEditIndex(null);
            toast.success('Information updated successfully', {
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

        setForm({ site: '', username: '', password: '' });
        setShowPassword({});
    };

    const handleEdit = (index) => {
        const passwordToEdit = passwords[index];
        setForm(passwordToEdit);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this credential?');
        if (confirmDelete) {
            const updatedPasswords = passwords.filter((_, i) => i !== index);
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
                                            type={showPassword[editIndex] ? "text" : "password"}
                                            placeholder='Enter Password' />
                                        <span
                                            onClick={() => handleShowPassword(editIndex)}
                                            className='absolute right-2 text-black cursor-pointer'
                                        >
                                            {showPassword[editIndex] ? <FaEyeSlash /> : <FaEye />}
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
