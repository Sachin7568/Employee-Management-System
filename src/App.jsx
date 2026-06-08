import React from 'react'
import { useState, useEffect } from 'react'
import initialEmployeesData from './data/employees'
import EmployeeList from './components/EmployeeList'
import SearchBar from './components/SearchBar'
import EmployeeForm from './components/EmployeeForm'


const App = () => {
  // try to load saved employees from local storage first, otherwise use the dummy data
  const [employees, setEmployees] = useState(() => {

    const savedEmployees = localStorage.getItem("employees");

    if(savedEmployees){
      return JSON.parse(savedEmployees);
    }
    return initialEmployeesData;
  });


  // states for the search bar, sorting, and the popup form
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);


  // save to local storage every time the employee list changes so data isn't lost on refresh
  useEffect(() => {

    localStorage.setItem(
      "employees",
      JSON.stringify(employees)
    );
  }, [employees]);


  // basic functions to add, update, and delete employees
  
  const addEmployee = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: Date.now()}]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };


  // filter employees based on search query, then sort them A-Z or Z-A
  const filteredEmployees = employees.filter((emp) => {
      const query = searchQuery.toLowerCase();
      return (
        emp.name.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>        
        <header className='mb-8 flex justify-between items-center'>
          <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 tracking-tight'>Employee Management System</h1>
          <button onClick={() => { setEmployeeToEdit(null); setIsFormOpen(true); }} className='px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition'>Add Employee</button>
        </header>

      <main>
        {isFormOpen && ( <EmployeeForm initialData={employeeToEdit} onSubmit={(data) => {
            if(employeeToEdit) updateEmployee(data);
            else addEmployee(data);
            setIsFormOpen(false);
            setEmployeeToEdit(null);
          }} onCancel={() => {
            setIsFormOpen(false);
            setEmployeeToEdit(null);
          }}/>
        )}

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="flex justify-end mb-4">
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 shadow-sm transition flex items-center gap-2">
            Sort by Name: {sortOrder === 'asc' ? 'A-Z ↓' : 'Z-A ↑'}
          </button>
        </div>

        <EmployeeList employees={filteredEmployees} onDelete={deleteEmployee} onEdit={(employee) => {
          setEmployeeToEdit(employee);
          setIsFormOpen(true);
          }}
        />
      </main>

      </div>
    </div>
  )
}

export default App