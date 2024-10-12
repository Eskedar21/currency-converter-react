
import React from 'react';

const ConversionResult = ({ fromCurrency, toCurrency, amount, convertedAmount, darkMode }) => {
    return (
        <div className="absolute left-32 bottom-10">
            {convertedAmount && (
                <div className="result">
                    <p className={`${darkMode ? "text-[#e8e8e8] " : "text-[#244e6d]"}`}>
                        <span className=" text-base font-medium font-['Inter']"> {amount} {fromCurrency}</span> = <br />
                        <span className="w-[190px] text-[28px] font-semibold font-['Inter']">{convertedAmount} {toCurrency}</span>
                    </p>
                    <p className={`${darkMode ? "text-[#e8e8e8] " : "text-[#244e6d]"} text-sm font-normal font-['Inter']`} >
                        1 {fromCurrency} = {(convertedAmount / amount).toFixed(4)} {toCurrency}
                    </p>
                    <p className={`${darkMode ? "text-[#e8e8e8] " : "text-[#244e6d]"} text-sm font-normal font-['Inter']`}>
                        1 {toCurrency} = {(1 / convertedAmount).toFixed(2)} {fromCurrency}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ConversionResult;
