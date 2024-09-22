'use client'
import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;



        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear other errors when user starts typing
        
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form Data Submitted:', formData);
            // Handle form submission here
        } else {
            setErrors(validationErrors);
        }
    };

    const handleKeyDown = (e, fieldName) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const formElements = Array.from(e.target.form.elements);
            const currentIndex = formElements.indexOf(e.target);
            const nextElement = formElements[currentIndex + 1];

            if (nextElement) {
                nextElement.focus();
            } else {
                handleSubmit(e);
            }
        }
    };

    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl font-bold text-center mb-5'>Sign up now and join the vast world of creators!!</h1>
            <div className="max-w-md mx-auto p-4 bg-blue-950 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
                <form onSubmit={handleSubmit} className='text-black'>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyDown(e, 'email')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyDown(e, 'password')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyDown(e, 'confirmPassword')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    

                    <div>
                        <button
                            type="submit"
                            className=" mt-5 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="text-right mt-3">
                    <a className="text-sm text-indigo-400 hover:text-indigo-500 focus:outline-none" href='/login'>
                        Already have an account? Log in now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
