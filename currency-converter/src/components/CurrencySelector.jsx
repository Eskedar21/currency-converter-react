import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/currencyService'; 
import { HiMiniArrowsRightLeft } from "react-icons/hi2";
import CurrencyDropdown from './CurrencyDropdown';

const CurrencySelector = ({ onCurrencyChange }) => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ETB');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["ETB", "USD"]);
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
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter(fav => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
    <div className=" flex gap-4">
      {/* From Currency Dropdown */}
      <CurrencyDropdown
        title="From"
        selectedCurrency={fromCurrency}
        currencies={currencies}
        favorites={favorites}
        onChange={setFromCurrency}
        onFavoriteToggle={handleFavorite}
        getCountryCode={getCountryCode}
      />

      {/* Swap Button */}
      <div className="flex justify-center items-center my-8">
      <button 
        onClick={swapCurrencies} 
        className='w-[45px] h-[45px] rounded-full border border-[#244e6d] flex justify-center items-center' // Change height to match width and make it a circle
      > 
        <HiMiniArrowsRightLeft className='w-6 h-6 text-[#244E6D]' />
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
      />
    </div>
  );
};

export default CurrencySelector;
