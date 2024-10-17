

const baseUrl = 'https://api.frankfurter.app';

// Fetch historical exchange rates
export const fetchHistoricalRates = async (fromCurrency = 'EUR', toCurrency = 'USD', startDate, endDate) => {
    const url = `${baseUrl}/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error fetching historical rates:', error);
    }
  };
  

  // Fetch the latest exchange rate along with the last update timestamp
export const fetchLatestRates = async (fromCurrency = 'BRL', toCurrency = 'CAD') => {
  const url = `${baseUrl}/latest?from=${fromCurrency}&to=${toCurrency}`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data; // Returns latest rates and timestamp
  } catch (error) {
      console.error('Error fetching latest rates:', error);
  }
};
