
// import React from 'react';
import { FaRegStar, FaStar } from "react-icons/fa"; 

const CurrencyDropdown = ({ 
    title, 
    selectedCurrency, 
    currencies, 
    favorites, 
    onChange, 
    onFavoriteToggle, 
    getCountryCode,
    darkMode
}) => {

  const isFavorite = (currency) => favorites.includes(currency);

  // Sorting currencies: Favorites first
  const sortedCurrencies = [...favorites, ...currencies.filter(currency => !favorites.includes(currency))];

  return (
    <div className="relative w-full">
      
      <label className={`${darkMode ? "text-neutral-100" : "text-[#244e6d]"} text-base font-semibold font-['Inter'] `}>
        {title}:
        <img 
          src={`https://flagsapi.com/${getCountryCode(selectedCurrency)}/flat/64.png`} 
          alt="flag" 
          className="w-8 h-6 absolute  left-0 flex md:top-9 sm:top-7 top-9  pl-3" 
        />
      </label>

      {/* Custom Dropdown */}
      <div className="flex items-center ">
        <select
          value={selectedCurrency}
          onChange={(e) => onChange(e.target.value)}
          className={`${darkMode ? "text-white border-neutral-100" : "text-[#244e6d] border-[#244e6d]"} bg-transparent rounded-lg border focus:outline-none px-9
          w-[289.95px] h-[43.03px]  md:w-[280px] md:h-[43.03px] sm:w-[180px] sm:h-[30px]`}
        >
          {sortedCurrencies.map((currency) => (
            <option 
              key={currency} 
              value={currency} 
              className={isFavorite(currency) ? 'bg-[#E8DA8C]' : ''}
            >
              {currency}
            </option>
          ))}
        </select>

        {/* Favorite Toggle Button */}
        <button
          onClick={() => onFavoriteToggle(selectedCurrency)}
          className="absolute right-5 top-9 sm:top-8 md:top-9 flex items-center"
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
