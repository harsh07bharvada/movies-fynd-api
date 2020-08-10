import React from 'react';

const Pill = ({data:{value, active}, onPillClick})=>{
    
    const overLoadedPillClick = () =>{
        onPillClick(value);
    }
    return(
        <div  
            onClick={overLoadedPillClick}
            className={`flex rounded-md m-2 text-sm px-3 py-2 cursor-pointer hover:shadow-md
                    ${active ?"bg-green-200 text-green-900":"bg-red-200 text-red-900"} `}>
            {value}
        </div>
    )
};

export default Pill;