
import React from 'react';

const ConversionResult = ({ fromCurrency, toCurrency, amount, convertedAmount, darkMode }) => {
    return (
        <div className="mt-5 md:absolute md:left-32 md:bottom-10 sm:absolute sm:left-20 sm:bottom-6">
            {convertedAmount && (
                <div className="text-center">
                    <p className={`${darkMode ? "text-[#e8e8e8]" : "text-[#244e6d]"}`}>
                        <span className="text-base font-medium"> {amount} {fromCurrency}</span> = <br />
                        <span className="text-[24px] font-semibold">{convertedAmount} {toCurrency}</span>
                    </p>
                    <p className={`${darkMode ? "text-[#e8e8e8]" : "text-[#244e6d]"} text-sm`}>
                        1 {fromCurrency} = {(convertedAmount / amount).toFixed(4)} {toCurrency}
                    </p>
                    <p className={`${darkMode ? "text-[#e8e8e8]" : "text-[#244e6d]"} text-sm`}>
                        1 {toCurrency} = {(1 / convertedAmount).toFixed(2)} {fromCurrency}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ConversionResult;
