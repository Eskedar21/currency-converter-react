// NavBar.jsx
import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-[url('/bg.png')] bg-fixed mt-0 h-[366px]  flex justify-center">
            <h1 className="text-white text-[24px] sm:text-3xl  md:text-4xl font-bold font-['PT Serif'] m-28">Currency Converter</h1>
        </nav>
    );
};

export default NavBar;
