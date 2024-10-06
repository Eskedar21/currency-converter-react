// LastUpdateInfo.js
import React, { useEffect, useState } from 'react';
import { fetchLatestRates } from '../services/historicalService';

const LastUpdateInfo = ({ fromCurrency, toCurrency }) => {
    const [lastUpdate, setLastUpdate] = useState('');

    useEffect(() => {
        const loadLatestRates = async () => {
            const data = await fetchLatestRates(fromCurrency, toCurrency);
            if (data) {
                const timestamp = data.date; 
                setLastUpdate(`Last updated on: ${timestamp}`);
            }
        };

        loadLatestRates();
    }, [fromCurrency, toCurrency]);

    return (
        <div>
            <h5>{lastUpdate}</h5>
        </div>
    );
};

export default LastUpdateInfo;
