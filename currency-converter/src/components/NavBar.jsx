
import React from 'react';

const NavBar = ({ darkMode }) => {
    return (
        <nav className={`bg-fixed mt-0 h-[366px] bg-screen flex justify-center ${darkMode ? "bg-[url('/dark.jpg')]" : "bg-[url('/light.png')]"}`}>
            <h1 className="text-white text-[20px] text-3xl  sm:text-3xl md:text-4xl md:m-28 font-bold font-['PT Serif'] flex justify-center item-center my-20">Currency Converter</h1>
        </nav>
    );
};

export default NavBar;
