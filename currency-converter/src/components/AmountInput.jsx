
import React, { useState } from 'react';

const AmountInput = ({ onAmountChange, darkMode }) => {
  const [amount, setAmount] = useState(1); // Default to 1

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    onAmountChange(value);
  };

  return (
    <div className='flex flex-col'>
      <label className="text-base font-semibold font-['Inter']" />
      <span className={` ${darkMode ? "text-neutral-100" : "text-[#244e6d]"} text-base font-semibold font-['Inter']'`}> Amount:</span>
      <input
        type="number"
        value={amount}
        onChange={handleChange}
        min="0"
        step="0.01"
        className={` ${darkMode ? "text-white border-neutral-100" : "text-[#244e6d] border-[#244E6D]"} bg-transparent w-[289.95px] h-[43.03px]  md:w-[280px] md:h-[43.03px] sm:w-[180px] sm:h-[30px] rounded-lg border px-3`} 
      />
    </div>
  );
};

export default AmountInput;
