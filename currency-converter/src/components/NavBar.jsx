import React from 'react';

const NavBar = ({ darkMode }) => {
    return (
                <nav className={`bg-center mt-0 h-[366px] flex justify-center ${darkMode ? "bg-[url('/dark.jpg')]" : "bg-[url('/light.png')]"}`}>
                    <h1 className="text-white text-[24px] sm:text-3xl md:text-4xl font-bold font-['PT Serif'] m-28">Currency Converter</h1>
                </nav>
    );
};

export default NavBar;
