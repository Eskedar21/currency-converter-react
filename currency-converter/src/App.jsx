import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons
import CurrencyInputContainer from './components/CurrencyInputContainer';
import ConversionResult from './components/ConversionResult';
import HistoricalRatesGraph from './components/HistoricalRatesGraph';
import SetAlert from './components/SetAlert';
import NavBar from './components/NavBar';

const App = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [conversionRate, setConversionRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [darkMode, setDarkMode] = useState(false); // Dark mode state

    const handleCurrencyChange = (from, to) => {
        setFromCurrency(from);
        setToCurrency(to);
    };

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
    };

    const handleConvert = () => {
        if (conversionRate) {
            const amountInToCurrency = (amount * conversionRate).toFixed(2);
            setConvertedAmount(amountInToCurrency);
        }
    };

    const updateConversionRate = (rate) => {
        setConversionRate(rate);
        setConvertedAmount(null);
    };

    const handleSetAlert = (alertValue, email) => {
        console.log(`Alert set for ${alertValue} ${fromCurrency} to ${email}`);
        // Add logic to save the alert in your database here
    };

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode); // Toggle dark mode
    };

    return (
        <div className={darkMode ? 'dark' : 'light'}> {/* Conditional class for dark mode */}
            <NavBar />
            <button 
                onClick={toggleDarkMode} 
                className="fixed top-4 right-4 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-transform transform"
            >
                {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
            </button>
            <CurrencyInputContainer 
                onCurrencyChange={handleCurrencyChange} 
                onAmountChange={handleAmountChange} 
                fromCurrency={fromCurrency} 
                toCurrency={toCurrency} 
                amount={amount} 
                onConvert={handleConvert} 
                setConversionRate={updateConversionRate} 
                convertedAmount={convertedAmount} 
            />
            <HistoricalRatesGraph fromCurrency={fromCurrency} toCurrency={toCurrency} />
            <SetAlert 
                conversionRate={conversionRate} 
                fromCurrency={fromCurrency} 
                onSetAlert={handleSetAlert} 
            />

            <div className={`w-screen  h-[500px] bg-[#244e6d] p-10`}>
                <div className="text-center text-white text-4xl font-normal font-['PT Serif']">
                    How to convert {fromCurrency} to {toCurrency}
                </div>

                <div className='flex justify-center items-center gap-14 p-5'>
                    <div className="w-[361px] h-[368px] bg-white/70 rounded-3xl backdrop-blur-[20px]">
                        <div className='px-6 py-10 space-y-6'>
                            <h2 className="text-[#244e6d] text-4xl font-semibold font-['Inter']">1</h2>
                            <p className="w-[276px] text-[#244e6d] text-4xl font-normal font-['Inter']">Input your amount</p>
                            <p className="text-[#244e6d]/90 text-base font-normal font-['Inter'] leading-normal">Simply type in the box how much you want to convert.</p>
                        </div>
                    </div>
                    <div className="w-[361px] h-[368px] bg-white/70 rounded-3xl backdrop-blur-[20px]">
                        <div className='px-6 py-10 space-y-6'>
                            <h2 className="text-[#244e6d] text-4xl font-semibold font-['Inter']">2</h2>
                            <p className="w-[276px] text-[#244e6d] text-4xl font-normal font-['Inter']">Choose your currencies</p>
                            <p className="text-[#244e6d]/90 text-base font-normal font-['Inter'] leading-normal">Click on the dropdown to select {fromCurrency} in the first dropdown as the currency that you want to convert and {toCurrency} in the second drop down as the currency you want to convert to.</p>
                        </div>
                    </div>
                    <div className="w-[361px] h-[368px] bg-white/70 rounded-3xl backdrop-blur-[20px]">
                        <div className='px-6 py-10 space-y-6'>
                            <h2 className="text-[#244e6d] text-4xl font-semibold font-['Inter']">3</h2>
                            <p className="w-[276px] text-[#244e6d] text-4xl font-normal font-['Inter']">That's it</p>
                            <p className="text-[#244e6d]/90 text-base font-normal font-['Inter'] leading-normal">Our currency converter will show you the current {fromCurrency} to {toCurrency} rate and how it's changed over the past day, week or month.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
