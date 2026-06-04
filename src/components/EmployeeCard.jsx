import React from 'react' 

// This component shows the info for one employee along with buttons to edit or delete them
const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
        <div className='flex justify-between items-start'>
            <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0'>
                    <img src={`https://ui-avatars.com/api/?name=${employee.name}&background=random&color=fff`} alt={employee.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                    <h3 className='text-xl font-semibold text-gray-800'>{employee.name}</h3>
                    <p className='text-blue-600 font-medium'>{employee.role}</p>
                </div>
            </div>
        </div>

        <div className='mt-4 text-gray-600 space-y-1'>
            <p>📧 <strong>Email:</strong> {employee.email}</p>
            <p>📞 <strong>Phone:</strong> {employee.phone_number}</p>
        </div>

        <div className='mt-6 flex gap-3'>
            <button 
             onClick={() => onEdit(employee)}
             className='px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors'>Edit</button>

            <button 
            onClick={() => onDelete(employee.id)} 
            className='px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors'>Delete</button>
        </div>        
    </div>
  );
};

export default EmployeeCard;