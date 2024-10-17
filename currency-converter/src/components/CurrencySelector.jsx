import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/currencyService'; 
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import CurrencyDropdown from './CurrencyDropdown';

const CurrencySelector = ({ onCurrencyChange, darkMode }) => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('CAD');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["BRL", "CAD"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available currencies
  useEffect(() => {
    setLoading(true); 
    fetchExchangeRates()
      .then(data => {
        setCurrencies(Object.keys(data.rates)); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch currencies:', error);
        setError('Failed to load currencies.');
        setLoading(false);
      });
  }, []);

  // Notify parent component about currency changes
  useEffect(() => {
    onCurrencyChange(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, onCurrencyChange]);

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  
 
  
   // Handle favorite toggling
const handleFavorite = (currency) => {
  setFavorites(prevFavorites => {
    let updatedFavorites = [...prevFavorites];
    
    if (updatedFavorites.includes(currency)) {
      // Remove the currency from favorites if it's already included
      updatedFavorites = updatedFavorites.filter(fav => fav !== currency);
    } else {
      // Add the currency to favorites if it's not included
      updatedFavorites.push(currency);
    }

    // Persist updated favorites in localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    return updatedFavorites; 
  });
};


  // Get country code from currency code for flag images
  const getCountryCode = (currencyCode) => {
    const countryCodeMap = {
      USD: 'US', EUR: 'EU', GBP: 'GB', ETB: 'ET', 
    };
    return countryCodeMap[currencyCode] || currencyCode.substring(0, 2);
  };

  if (loading) {
    return <p>Loading currencies...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div className=" flex flex-col sm:gap-4 my sm:flex-row">
      {/* From Currency Dropdown */}
      <CurrencyDropdown
        title="From"
        selectedCurrency={fromCurrency}
        currencies={currencies}
        favorites={favorites}
        onChange={setFromCurrency}
        onFavoriteToggle={handleFavorite}
        getCountryCode={getCountryCode}
        darkMode={darkMode}
      />

      {/* Swap Button */}
      <div className="relative md:top-[68px] md:left-11 sm:top-14 sm:left-8 top-14 left-28">
        <button 
          onClick={swapCurrencies} 
          className={`ansolute top-10 left-14 md:w-[45px] md:h-[45px] sm:w-[30px] sm:h-[30px] w-[46.11px] h-[45.08px] sm:-rotate-180 md:-rotate-180 origin-top-left -rotate-90 rounded-full border ${darkMode ? "border-neutral-100" : "border-[#244E6D] "} flex justify-center items-center`}
        > 
          <HiMiniArrowsRightLeft className={`w-6 md:h-6 sm:h-[15.44px] h-[24.59px] ${darkMode ? "text-neutral-100" : "text-[#244E6D] "}`} />
        </button>
      </div>

      {/* To Currency Dropdown */}
      <CurrencyDropdown
        title="To"
        selectedCurrency={toCurrency}
        currencies={currencies}
        favorites={favorites}
        onChange={setToCurrency}
        onFavoriteToggle={handleFavorite}
        getCountryCode={getCountryCode}
        darkMode={darkMode}
      />
    </div>
  );
};

export default CurrencySelector;
