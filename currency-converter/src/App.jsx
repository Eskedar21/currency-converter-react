
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
        <div className={`&{darkMode ? 'dark' : 'light' } mx-0`}>
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
            <CurrencyInputContainer 
                onCurrencyChange={handleCurrencyChange} 
                onAmountChange={handleAmountChange} 
                fromCurrency={fromCurrency} 
                toCurrency={toCurrency} 
                amount={amount} 
                setConversionRate={setConversionRate}
                convertedAmount={convertedAmount}
                setConvertedAmount={setConvertedAmount}
                onConvert={handleConvert} 
                darkMode={darkMode}
            />
            
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
                        <div className={` ${darkMode ? "bg-[#0f2b40]" : "bg-[#244e6d]"} w-full md:h-[551px]  h-auto p-10 mt-4`}>
                        <div className="text-center text-white md:text-4xl text-[37.30px] sm:text-3xl  font-normal font-['PT Serif'] mb-10">
                            How to convert {fromCurrency} to {toCurrency}
                        </div>

                        <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14 p-5'>
                            <div className={`${darkMode ? "bg-[#666666]/70" : "bg-[#f8f8f8]/70"} w-[374px] h-[300.37px] md:w-[234.62px] md:h-[234.62px] lg:w-[361px] lg:h-[368px] rounded-[24.86px] md:rounded-3xl backdrop-blur-[20px]`}>
                            <div className={`${darkMode ? "text-white" : "text-[#244e6d]"} px-4 py-8 space-y-4`}>
                                <h2 className="text-3xl font-semibold font-['Inter']">1</h2>
                                <p className="text-2xl font-normal font-['Inter']">Input your amount</p>
                                <p className="text-sm font-normal font-['Inter'] leading-normal">
                                Simply type in the box how much you want to convert.
                                </p>
                            </div>
                            </div>

                            <div className={`${darkMode ? "bg-[#666666]/70" : "bg-[#f8f8f8]/70"} w-[374px] h-[300.37px] md:w-[234.62px] md:h-[234.62px] lg:w-[361px] lg:h-[368px] rounded-[24.86px] md:rounded-3xl backdrop-blur-[20px]`}>
                            <div className={`${darkMode ? "text-white" : "text-[#244e6d]"} px-4 py-8 space-y-4`}>
                                <h2 className="text-3xl font-semibold font-['Inter']">2</h2>
                                <p className="text-2xl font-normal font-['Inter']">Choose your currencies</p>
                                <p className="text-sm font-normal font-['Inter'] leading-normal">
                                Click on the dropdown to select {fromCurrency} in the first dropdown as the currency that you want to convert and {toCurrency} in the second dropdown as the currency you want to convert to.
                                </p>
                            </div>
                            </div>

                            <div className={`${darkMode ? "bg-[#666666]/70" : "bg-[#f8f8f8]/70"} w-[374px] h-[300.37px] md:w-[234.62px] md:h-[234.62px] lg:w-[361px] lg:h-[368px] rounded-[24.86px] md:rounded-3xl backdrop-blur-[20px]`}>
                            <div className={`${darkMode ? "text-white" : "text-[#244e6d]"} px-4 py-8 space-y-4`}>
                                <h2 className="text-3xl font-semibold font-['Inter']">3</h2>
                                <p className="text-2xl font-normal font-['Inter']">That's it</p>
                                <p className="text-sm font-normal font-['Inter'] leading-normal">
                                Our currency converter will show you the current {fromCurrency} to {toCurrency} rate and how it's changed over the past day, week, or month.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>

                                </div>
    );
};

export default App;
