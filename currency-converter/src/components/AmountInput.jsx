import React, { useState } from 'react';

const AmountInput = ({ onAmountChange }) => {
  const [amount, setAmount] = useState(1); // Default to 1

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    onAmountChange(value);
  };

  return (
    <div className=' flex flex-col'>
      <label />
        <span className="w-[31.20px] h-[22.29px] absolute  flex top-11 "> Amount:</span>
        <input
          type="number"
          value={amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          className= " w-[280px] h-[43.03px] sm:w-[182.06px] sm:h-[27.02px] md:w-[282px] md:h-11 rounded-lg border border-[#244e6d] px-3"
        />
      
    </div>
  );
};

export default AmountInput;


