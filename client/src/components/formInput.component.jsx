import React from 'react';


const FormInput = ({ label, handleChange, ...otherProps }) => {

    return (
        <>
            <div className="flex flex-row w-full ">
                <span className="text-xl tracking-wider text-gray-700">
                    {label}
                </span>
            </div>
            <div className="flex flex-row w-full">
                <input className="flex w-full h-12 rounded-md border-2 text-xl text-gray-600 md:px-2"
                    onChange={handleChange}
                    {...otherProps}
                />
            </div>
        </>

    )
}
export default FormInput;
