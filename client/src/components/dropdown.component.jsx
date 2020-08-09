import React from 'react';

const Dropdown = ({name, values, dropdownOnClick})=>(
    <select className="mx-2 py-5 px-4 text-lg font-semibold rounded shadow-lg" name={name} id={name} onChange={dropdownOnClick}>
        <option key="Sort"  value="Sort">Sort</option>
        {
            values.length>0 ? values.map((v,index)=><option key={index}  value={v}>{v}</option>) : ""
        }
        
    </select>
);

export default Dropdown;