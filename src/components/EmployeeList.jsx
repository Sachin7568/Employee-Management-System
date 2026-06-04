import React from 'react'
import EmployeeCard from './EmployeeCard'

// This component shows the list of employees or a message if the list is empty
const EmployeeList = ({ employees, onDelete, onEdit }) => {
    if(employees.length ===0) {
        return (
            <div className='text-center my-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No employees found</h3>
                <p className='text-gray-500'>Try adjusting your search criteria or add a new employee.</p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {employees.map((emp) => (
                <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={onDelete}
                onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default EmployeeList;