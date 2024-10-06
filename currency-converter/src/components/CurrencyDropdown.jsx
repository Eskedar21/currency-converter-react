import React from 'react';
import { FaRegStar, FaStar } from "react-icons/fa"; 

const CurrencyDropdown = ({ 
    title, 
    selectedCurrency, 
    currencies, 
    favorites, 
    onChange, 
    onFavoriteToggle, 
    getCountryCode 
}) => {

  const isFavorite = (currency) => favorites.includes(currency);

  // Sorting currencies: Favorites first
  const sortedCurrencies = [...favorites, ...currencies.filter(currency => !favorites.includes(currency))];

  // Custom component for rendering each currency option
  const CurrencyOption = ({ currency }) => (
    <div className="flex items-center p-2">
      <img 
        src={`https://flagsapi.com/${getCountryCode(currency)}/flat/32.png`} 
        alt="flag" 
        className="w-6 h-4 mr-2"
      />
      {isFavorite(currency) ? (
        <FaStar className="text-yellow-500 mr-1" />
      ) : (
        <FaRegStar className="text-gray-400 mr-1" />
      )}
      <span className={`text-base font-semibold ${isFavorite(currency) ? 'text-[#244E6D]' : 'text-black'}`}>
        {currency}
      </span>
    </div>
  );

  return (
    <div className="relative">
      <label className="text-[#244e6d] text-base font-semibold font-['Inter']">
        {title}:
        <img 
          src={`https://flagsapi.com/${getCountryCode(selectedCurrency)}/flat/64.png`} 
          alt="flag" 
          className="w-[31.20px] h-[22.29px] absolute left-0 flex top-11 pl-3" // Added margin for spacing
        />
      </label>

      {/* Custom Currency Dropdown */}
      <div className="flex items-center mt-2">
        <select
          value={selectedCurrency}
          onChange={(e) => onChange(e.target.value)}
          className=" w-[200px] h-[43.03px] sm:w-[182.06px] sm:h-[27.02px] md:w-[282px] md:h-11  rounded-lg border border-[#244e6d] focus:outline-none px-9"
        >
          {sortedCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              <CurrencyOption currency={currency} />
            </option>
          ))}
        </select>

        {/* Favorite Toggle Button */}
        <button
          onClick={() => onFavoriteToggle(selectedCurrency)}
          className=" absolute right-5 flex items-center text-sm leading-5"
        >
          {isFavorite(selectedCurrency) ? (
            <FaStar className="text-[#244e6d] w-5 h-5" />
          ) : (
            <FaRegStar className="text-gray-400 w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;

