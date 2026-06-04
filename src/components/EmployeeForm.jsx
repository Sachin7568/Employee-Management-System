import React from 'react'
import { useState, useEffect } from 'react'

// we use this same form for both adding a new employee and editing an existing one
const EmployeeForm = ({ onSubmit, onCancel, initialData}) => {

    // keep track of what the user is typing in the inputs
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        phone_number: ""
    });
    const [error, setError] = useState("");

    // if we passed in an employee to edit, pre-fill the form with their data
    useEffect(() => {
        if(initialData) {
            setFormData(initialData);
        }
    },[initialData]);

    // update the specific field in our state when the user types
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    };

    // check if name and email are filled out before submitting
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.name || !formData.email) {
            setError("Name and Email are required!");
            return;
        }
        setError("");
        onSubmit(formData);
    };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
        <div className='bg-white p-8 rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>{initialData ? 'Edit Employee' : 'Add Employee'}</h2>
            
            {error && (
                <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>Name *</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} required
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
                </div>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>Email *</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} required
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
                </div>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>Role</label>
                    <input type="text" name='role' value={formData.role} onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
                </div>
                <div>
                    <label className='block text-gray-700 font-medium mb-1'>Phone Number</label>
                    <input type="text" name='phone_number' value={formData.phone_number} onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'/>
                </div>
            </div>

            <div className='flex justify-end gap-3 mt-6'>
                <button type='button' onClick={onCancel}
                className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors'>Cancel</button>
                <button type='submit' className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>{initialData ? "Update Employee" : "Add Employee" }</button>
            </div>

        </form>
        </div>
    </div>
  )
}

export default EmployeeForm