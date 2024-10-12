
import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons
import CurrencyInputContainer from './components/CurrencyInputContainer';
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
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    const handleCurrencyChange = (from, to) => {
        setFromCurrency(from);
        setToCurrency(to);
    };

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
    };

    const handleSetAlert = (alertValue, email) => {
        console.log(`Alert set for ${alertValue} ${fromCurrency} to ${email}`);
    };

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    useEffect(() => {
        document.body.className = darkMode ? 'bg-[#181818] text-white' : 'bg-white text-black';
    }, [darkMode]);

    const handleConvert = () => {
        if (fromCurrency && toCurrency) {
            const fetchConversionRate = async () => {
                try {
                    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
                    
                    if (!response.ok) {
                        const errorDetails = await response.text();
                        throw new Error(`Failed to fetch exchange rate: ${response.statusText} - ${errorDetails}`);
                    }

                    const data = await response.json();
                    const rate = data.rates[toCurrency];

                    // Check if the currency pair is valid
                    if (!rate) {
                        throw new Error(`Unsupported currency: ${fromCurrency} to ${toCurrency}`);
                    }

                    setConversionRate(rate);
                    const result = (amount * rate).toFixed(2);
                    setConvertedAmount(result);

                    // Reset error message
                    setErrorMessage('');

                } catch (error) {
                    console.error('Error fetching conversion rate:', error.message);
                    setErrorMessage(error.message); // Set error message
                }
            };
            fetchConversionRate();
        }
    };

    return (
        <div className={darkMode ? 'dark' : 'light'}>
            <NavBar darkMode={darkMode} />
            <button 
                type='button'
                onClick={toggleDarkMode} 
                className="fixed top-4 right-7 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-transform transform z-50"
            >
                {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-[#244e6d]" />}
            </button>

            {/* Error Alert */}
            {errorMessage && (
                <div className="bg-red-500 text-white p-4 rounded-md my-2">
                    {errorMessage}
                </div>
            )}

            {/* Pass the necessary props to CurrencyInputContainer */}
            <CurrencyInputContainer 
                onCurrencyChange={handleCurrencyChange} 
                onAmountChange={handleAmountChange} 
                fromCurrency={fromCurrency} 
                toCurrency={toCurrency} 
                amount={amount} 
                setConversionRate={setConversionRate}
                convertedAmount={convertedAmount}
                setConvertedAmount={setConvertedAmount}
                onConvert={handleConvert} // Pass the handleConvert function
                darkMode={darkMode}
            />
            
            {/* Conversion Result is now handled within CurrencyInputContainer */}

            <HistoricalRatesGraph
            fromCurrency={fromCurrency} 
            toCurrency={toCurrency} 
            darkMode={darkMode}
            />

            <SetAlert 
                conversionRate={conversionRate} 
                fromCurrency={fromCurrency} 
                onSetAlert={handleSetAlert} 
                darkMode={darkMode}
            />

            <div className={` ${darkMode ? " bg-[#0f2b40]" : " bg-[#244e6d] "} w-screen h-[500px] p-10 ` }>
                <div className="text-center text-white text-4xl font-normal font-['PT Serif']">
                    How to convert {fromCurrency} to {toCurrency}
                </div>

                <div className='flex justify-center items-center gap-14 p-5'>
                    <div className={`${darkMode ? " bg-[#666666]/70 " : "bg-white/70  "} w-[361px] h-[368px] rounded-3xl backdrop-blur-[20px]`}>
                        <div className= {` ${darkMode ? "text-white " : "text-[#244e6d]  "} px-6 py-10 space-y-6`}>
                            <h2 className=" text-4xl font-semibold font-['Inter']">1</h2>
                            <p className="w-[276px] text-4xl font-normal font-['Inter']">Input your amount</p>
                            <p className=" text-base font-normal font-['Inter'] leading-normal">Simply type in the box how much you want to convert.</p>
                        </div>
                    </div>
                    <div className={`${darkMode ? " bg-[#666666]/70 " : "bg-white/70  "} w-[361px] h-[368px] rounded-3xl backdrop-blur-[20px]`}>
                        <div className= {` ${darkMode ? "text-white " : "text-[#244e6d]  "} px-6 py-10 space-y-6`}>
                            <h2 className="d] text-4xl font-semibold font-['Inter']">2</h2>
                            <p className="w-[276px] text-4xl font-normal font-['Inter']">Choose your currencies</p>
                            <p className=" text-base font-normal font-['Inter'] leading-normal">Click on the dropdown to select {fromCurrency} in the first dropdown as the currency that you want to convert and {toCurrency} in the second drop down as the currency you want to convert to.</p>
                        </div>
                    </div>
                    <div className={`${darkMode ? " bg-[#666666]/70 " : "bg-white/70  "} w-[361px] h-[368px] rounded-3xl backdrop-blur-[20px]`}>
                        <div className= {` ${darkMode ? "text-white " : "text-[#244e6d]  "} px-6 py-10 space-y-6`}>
                            <h2 className="text-4xl font-semibold font-['Inter']">3</h2>
                            <p className="w-[276px] text-4xl font-normal font-['Inter']">That's it</p>
                            <p className=" text-base font-normal font-['Inter'] leading-normal">Our currency converter will show you the current {fromCurrency} to {toCurrency} rate and how it's changed over the past day, week or month.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
