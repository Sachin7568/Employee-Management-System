import React from 'react'

const SearchBar = ( { searchQuery, setSearchQuery}) => {
  return (
    <div className='mb-6'>
        <input type="text"
        placeholder='Search employees by name, role, or email...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-full px-4 py-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm'
        />
    </div>
  );
};

export default SearchBar;