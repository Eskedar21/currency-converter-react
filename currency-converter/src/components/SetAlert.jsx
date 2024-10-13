import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const SetAlert = ({ fromCurrency, toCurrency, conversionRate, darkMode }) => {
  const [alertValue, setAlertValue] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State for success/failure message
  const [isAlertSet, setIsAlertSet] = useState(false); // State to track if alert is set

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (alertValue && email) {
      setIsAlertSet(true);
      setMessage('Alert set! We will notify you when the rate changes.');
    }
  };

  // Effect to check if the conversion rate meets the alert condition
  useEffect(() => {
    if (isAlertSet && conversionRate) {
      const rate = parseFloat(conversionRate);
      const alertThreshold = parseFloat(alertValue);

      if (rate > alertThreshold) {
        sendAlertEmail(email, fromCurrency, toCurrency, alertValue, rate);
        setIsAlertSet(false); // Reset alert after triggering
      }
    }
  }, [conversionRate, isAlertSet, alertValue, email, fromCurrency, toCurrency]);

  const sendAlertEmail = async (recipientEmail, fromCurrency, toCurrency, alertValue, rate) => {
    const templateParams = {
      user_email: recipientEmail,
      fromCurrency: fromCurrency, 
      toCurrency: toCurrency,      
      alertValue: rate.toFixed(2)  
    };

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_z6b0fo9', 
        'template_uowxk58', 
        templateParams,
        'WJ37ot3hEXEsIBG3I' 
      );

      console.log('Email sent successfully!', response.text);
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Error sending alert. Please try again later.');
    }
  };

  return (
    <div className={`w-screen h-[564px] flex-col items-center inline-flex mt-28 relative px-4`}>
      <div className={`${darkMode ? "text-white" : "text-[#244e6d]"} w-full max-w-[600px] flex-col justify-start items-center gap-8 inline-flex`}>
        <h2 className="text-center text-[34px] font-normal font-['Inter']">Waiting on a better rate?</h2>
        <p className="text-center text-base font-normal font-['Inter']">
          Set an alert now, and we'll tell you when it gets better.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <label className="space-y-3">
              <div>
                <span className={`${darkMode ? "text-white" : "text-[#244e6d]"} text-lg font-semibold font-['Inter']`}>
                  Email me when
                </span> 
                <p className={`${darkMode ? "text-white" : "text-[#244e6d]"} text-base font-normal font-['Inter']`}>
                  {`1 ${fromCurrency} goes above ${alertValue}`}
                </p>
                <p className={`${darkMode ? "text-white" : "text-[#244e6d]"} text-sm font-normal font-['Inter']`}>
                  Current rate: {conversionRate} {fromCurrency} to {toCurrency}
                </p>
              </div>
              <input
                type="number"
                value={alertValue}
                onChange={(e) => setAlertValue(e.target.value)}
                placeholder="1000"
                className={`w-full h-[42px] rounded-lg px-3 text-sm font-normal font-['Inter'] border ${darkMode ? "border-neutral-100" : "border-[#244e6d]"} bg-transparent`}
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="flex flex-col">
              <span className={`${darkMode ? "text-white" : "text-[#244e6d]"} text-lg font-normal font-['Inter']`}>
                Your email address
              </span> 
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name.surname@gmail.com"
                className={`w-full h-[42px] rounded-lg px-3 border ${darkMode ? "border-neutral-100" : "border-[#244e6d]"} bg-transparent`}
              />
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full h-[42px] mt-5 p-2.5 bg-[#dddddd]/60 hover:bg-[#244e6d] hover:text-white focus:bg-[#244e6d] focus:text-white rounded-lg text-center text-[#676767] text-base font-semibold font-['Inter']"
          >
            Get rate alerts
          </button>
        </form>

        {/* Display success or error message */}
        {message && (
          <p className={`mt-4 text-center text-lg font-semibold ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SetAlert;
