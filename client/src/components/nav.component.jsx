import React from 'react';
import Logo from '../assets/logo.svg';

const Nav = props =>(
    <div className="flex w-full h-20 bg-gray-900 px-3 md:px-8 justify-between items-center text-white">
        <div className="flex px-2 font-bold text-2xl justify-center items-center">
            <img className=" h-6 md:h-8 px-1 md:px-3" src={Logo} alt="Logo"/>
            <span>Movieo</span>
        </div>
        <div className="py-2 px-4 md:py-3 md:px-6 rounded bg-gray-800 text-white text-xs md:text-base font-semibold cursor-pointer"> Sign In / Sign Up</div>
    </div>
);

export default Nav;