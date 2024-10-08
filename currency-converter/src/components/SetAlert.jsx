import React, { useState } from 'react';
import { db } from '../services/firebaseConfig'; // Adjust the import based on your folder structure
import { collection, addDoc } from 'firebase/firestore';

const SetAlert = ({ fromCurrency, toCurrency, amount }) => {
  const [alertValue, setAlertValue] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State for success/failure message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save the alert to Firestore
      await addDoc(collection(db, 'alerts'), {
        email,
        alertValue,
        fromCurrency,
        toCurrency,
        amount,
        createdAt: new Date(),
      });
      
      // Show success message after form submission
      setMessage('Success! We will notify you when the rate changes.');
      
      // Clear input fields
      setAlertValue('');
      setEmail('');
    } catch (error) {
      console.error('Error setting alert:', error);
      setMessage('Error setting alert. Please try again later.');
    }
  };

  return (
    <div className="w-screen h-[564px] bg-[#f8f8f8] flex-col items-center inline-flex pt-7 relative">
      <div className="h-[111px] flex-col justify-start items-center gap-8 inline-flex">
        <h2 className="text-center text-[#244e6d] text-[34px] font-normal font-['Inter']">Waiting on a better rate?</h2>
        <p className="text-center text-[#244e6d] text-base font-normal font-['Inter']">
          Set an alert now, and we'll tell you when it gets better.
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='space-y-3'>
              <div>
                <span className="text-[#244e6d] text-lg font-semibold font-['Inter']">Email me when</span> 
                <p className="text-[#244e6d] text-base font-normal font-['Inter']">{`1 ${fromCurrency} goes above ${alertValue}`}</p>
              </div>
              <input
                type="number"
                value={alertValue}
                onChange={(e) => setAlertValue(e.target.value)}
                placeholder="1000"
                className="w-[531px] h-[42px] rounded-lg px-3 text-sm font-normal font-['Inter'] border border-[#244e6d]"
              />
            
            </label>
          </div>
          <div>
            <label className='flex flex-col pt-6'>
              <span className="text-[#244e6d] text-lg font-normal font-['Inter']">Your email address</span> 
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name.surname@gmail.com"
                className="w-[531px] h-[42px] rounded-lg px-3 border border-[#244e6d]"
              />
            </label>
          </div>
          <button 
            type="submit" 
            className="h-[39px] w-[531px] mt-5 p-2.5 bg-[#dddddd]/60 rounded-lg justify-center items-center gap-2.5 inline-flex text-center text-[#676767] text-base font-semibold font-['Inter']"
          >
            Get rate alerts
          </button>
        </form>
        
        {/* Display success or error message */}
        {message && (
          <p className="mt-4 text-center text-lg font-semibold text-green-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SetAlert;
