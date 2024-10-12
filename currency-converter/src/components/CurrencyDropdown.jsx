import React from 'react';
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
    <div className="relative">
      <label className= {` ${ darkMode ? "text-neutral-100" : "text-[#244e6d] "} text-base font-semibold font-['Inter'] `}>
        {title}:
        <img 
          src={`https://flagsapi.com/${getCountryCode(selectedCurrency)}/flat/64.png`} 
          alt="flag" 
          className="w-[31.20px] h-[22.29px] absolute left-0 flex top-11 pl-3" 
        />
      </label>
    
      {/* Custom Dropdown */}
      <div className="flex items-center mt-2">
        <select
          value={selectedCurrency}
          onChange={(e) => onChange(e.target.value)}
          className= {` md:w-[280px] md:h-[43.03px]  sm:w-[182.06px] sm:h-[28.31px] w-[289.95px] h-[43.03px]  ${darkMode ? "text-white  border-neutral-100" : "text-[#244e6d] border-[#244e6d]  "} bg-transparent  sm:h-[27.02px] md:w-[282px] md:h-11 rounded-lg border focus:outline-none px-9 `}
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
          className="absolute right-5 flex items-center"
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



// 

