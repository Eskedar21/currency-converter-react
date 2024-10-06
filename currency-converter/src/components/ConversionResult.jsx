import React, { useEffect } from 'react';
import { fetchCurrencyPairRate } from '../services/currencyService';

const ConversionResult = ({ fromCurrency, toCurrency, amount, setConversionRate, convertedAmount }) => {
    useEffect(() => {
        if (fromCurrency && toCurrency) {
            fetchCurrencyPairRate(fromCurrency, toCurrency)
                .then(data => {
                    const rate = data.rates[toCurrency];
                    setConversionRate(rate);
                })
                .catch(error => console.error('Failed to fetch conversion rate:', error));
        }
    }, [fromCurrency, toCurrency, setConversionRate]);

    return (
        <div className="mt-4">
            {convertedAmount !== null ? (
                <div className='absolute left-32 bottom-10'>
                    <p flex   >
                        <span className="text-[#244e6d] text-base font-medium font-['Inter']"> {amount}{fromCurrency}</span> = <span className="w-[190px] text-[#244e6d] text-[28px] font-semibold font-['Inter']">{convertedAmount} {toCurrency}</span>
                    </p>
                    <p className="text-[#244e6d] text-sm font-normal font-['Inter']">
                         1 {fromCurrency} = {(convertedAmount / amount).toFixed(4)} {toCurrency}
                    </p>
                    <p className="text-[#244e6d] text-sm font-normal font-['Inter']">
                        1 {toCurrency} = {(1 / convertedAmount).toFixed(2)} {fromCurrency}
                   </p>
                    
                </div>
            ) : (
                <p>Please enter an amount and click Convert to see the result.</p>
            )}
        </div>
    );
};

export default ConversionResult;
