const API_BASE_URL = 'https://api.frankfurter.app';

// Fetch available currencies and their exchange rates
export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest?base=USD`);

    // Check if the response is OK
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch exchange rates: ${response.statusText} - ${errorDetails}`);
    }

    return response.json(); 
  } catch (error) {
    if (error.message.includes('NetworkError')) {
      throw new Error('Network error: Please check your internet connection.');
    } else {
    
      console.error('An error occurred:', error.message);
    }
  }
};

// Fetch exchange rate for a specific currency pair
export const fetchCurrencyPairRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest?base=${fromCurrency}&symbols=${toCurrency}`);

    // Check if the response is OK
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch exchange rate for ${fromCurrency}/${toCurrency}: ${response.statusText} - ${errorDetails}`);
    }

    return response.json();
  } catch (error) {
    if (error.message.includes('NetworkError')) {
      throw new Error('Network error: Please check your internet connection.');
    } else if (error.message.includes('404')) {
      throw new Error(`Currency not supported: ${fromCurrency} or ${toCurrency} might not be available.`);
    } else {
      console.error('An error occurred:', error.message);
    }
  }
};


