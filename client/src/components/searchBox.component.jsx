import React from 'react';

const SearchBox = ({placeholder, handleSearchChange}) =>(
    
    <input className="py-5 px-4 shadow-lg w-3/5 text-lg font-semibold rounded-md" 
        type="search" 
        placeholder={placeholder} 
        onChange={handleSearchChange}
    />
);

export default SearchBox;