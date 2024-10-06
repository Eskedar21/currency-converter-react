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
  onConvert,
  setConversionRate, 
  convertedAmount, 
   
}) => {
  return (
    
    <div className="md:w-[1200px] md:h-80 sm:h-80 sm:wi[772px] w-[400px] h-[559px]  bg-[#f8f8f8] rounded-lg absolute top-52 left-1/2 transform -translate-x-1/2 flex flex-col items-center  pt-10">
      <div className="flex flex-col sm:flex-row sm:gap-10 md:gap-10 space-y-3 sm:space-y-0 md:items-center"
>
        <AmountInput
          onAmountChange={onAmountChange} 
          amount={amount} 
        />
        
        <CurrencySelector 
          onCurrencyChange={onCurrencyChange} 
          fromCurrency={fromCurrency} 
          toCurrency={toCurrency} 
        />
      </div>

       <div className='absolute right-32 bottom-10'>
       <button 
        onClick={onConvert} 
        className="mt-5 w-[157px] h-[39px] px-4 py-2.5 bg-[#244e6d] rounded-lg flex justify-center items-center gap-2.5 text-white text-base font-semibold font-['PT Serif']"
      >
        Convert
      </button>
       </div>
      

      <ConversionResult 
        fromCurrency={fromCurrency} 
        toCurrency={toCurrency} 
        amount={amount} 
        setConversionRate={setConversionRate} 
        convertedAmount={convertedAmount} 
      />
    </div>
  );
};

export default CurrencyInputContainer;