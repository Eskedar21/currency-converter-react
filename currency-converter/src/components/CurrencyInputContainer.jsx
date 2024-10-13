
import React from 'react';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult'; 

const CurrencyInputContainer = ({
  onCurrencyChange,
  onAmountChange,
  fromCurrency,
  toCurrency,
  amount,
  setConversionRate,
  convertedAmount,
  darkMode,
  onConvert, 
}) => {
  return (
    <div className={`md:w-[1200px] md:h-80 sm:w-[90%] min-h-[250px]  w-[500px] ${darkMode ? "bg-black" : "bg-[#f8f8f8]"} rounded-lg absolute top-52 left-1/2 transform -translate-x-1/2 flex flex-col items-center pt-10 pb-2`}>
      <div className="flex flex-col sm:flex-row sm:gap-5 md:gap-10 space-y-3 sm:space-y-0 md:items-center">
        <AmountInput onAmountChange={onAmountChange} amount={amount} darkMode={darkMode}/>
        <CurrencySelector onCurrencyChange={onCurrencyChange} fromCurrency={fromCurrency} toCurrency={toCurrency} darkMode={darkMode} />
      </div>

      <div className='flex justify-center mt-5 md:absolute md:right-32 md:bottom-10'>
        <button 
          onClick={onConvert} 
          className={`${darkMode ? "bg-[#0f2b40]" : "bg-[#244e6d]"} mt-5 w-[150px] h-[40px] rounded-lg flex justify-center items-center gap-2 text-white text-base font-semibold`}>
          Convert
        </button>
      </div>

      <ConversionResult 
        fromCurrency={fromCurrency} 
        toCurrency={toCurrency} 
        amount={amount} 
        setConversionRate={setConversionRate} 
        convertedAmount={convertedAmount} 
        darkMode={darkMode}
      />
    </div>
  );
};

export default CurrencyInputContainer;
