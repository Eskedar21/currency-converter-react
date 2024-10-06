// Define the base URL for the Frankfurter Exchange Rate API
const API_BASE_URL = 'https://api.frankfurter.app';

// Fetch available currencies and their exchange rates
export const fetchExchangeRates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest?base=USD`);
    
    // Check for successful response
    if (!response.ok) {
      const errorDetails = await response.text(); // Get more details on the error
      throw new Error(`Failed to fetch exchange rates: ${response.statusText} - ${errorDetails}`);
    }
    
    return response.json(); 
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Fetch exchange rate for a specific currency pair
export const fetchCurrencyPairRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await fetch(`${API_BASE_URL}/latest?base=${fromCurrency}&symbols=${toCurrency}`);
    
    // Check for successful response
    if (!response.ok) {
      const errorDetails = await response.text(); // Get more details on the error
      throw new Error(`Failed to fetch exchange rate for ${fromCurrency}/${toCurrency}: ${response.statusText} - ${errorDetails}`);
    }
    
    return response.json(); // Return the parsed JSON data
  } catch (error) {
    console.error(error.message);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Fetch available currencies and their full names
export const fetchAvailableCurrencies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/currencies`);
    
    // Check for successful response
    if (!response.ok) {
      const errorDetails = await response.text(); // Get more details on the error
      throw new Error(`Failed to fetch available currencies: ${response.statusText} - ${errorDetails}`);
    }
    
    return response.json(); // Return the parsed JSON data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};



