
import React, { useState, useEffect } from 'react';
import { fetchHistoricalRates } from '../services/historicalService';
import { Line } from 'react-chartjs-2';
import LastUpdateInfo from './LastUpdateInfo'; 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalRatesGraph = ({ fromCurrency, toCurrency, darkMode }) => {
    const [timePeriod, setTimePeriod] = useState('1m'); // Default is set to '1m' (1 Month)
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const calculateTimeRange = () => {
            const today = new Date();
            let startDate = new Date(today);

            switch (timePeriod) {
                case '48h':
                    startDate.setDate(today.getDate() - 2);
                    break;
                case '1w':
                    startDate.setDate(today.getDate() - 7);
                    break;
                case '1m':
                    startDate.setMonth(today.getMonth() - 1);
                    break;
                case '6m':
                    startDate.setMonth(today.getMonth() - 6);
                    break;
                case '1y':
                    startDate.setFullYear(today.getFullYear() - 1);
                    break;
                case '5y':
                    startDate.setFullYear(today.getFullYear() - 5);
                    break;
                default:
                    startDate.setMonth(today.getMonth() - 1); // Default to 1 month if no case matches
            }

            return [startDate.toISOString().split('T')[0], today.toISOString().split('T')[0]];
        };

        const loadHistoricalRates = async () => {
            const [startDate, endDate] = calculateTimeRange();
            const data = await fetchHistoricalRates(fromCurrency, toCurrency, startDate, endDate);
            setGraphData(data);
        };

        loadHistoricalRates();
    }, [timePeriod, fromCurrency, toCurrency]);

    const chartData = {
        labels: Object.keys(graphData || {}),
        datasets: [
            {
                label: `Exchange Rate (${fromCurrency} to ${toCurrency})`,
                data: Object.values(graphData || {}).map(rate => rate[toCurrency]),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return (
        <div className={` ${darkMode ? "bg-[#181818]" : "bg-white" }  mt-16 `}>
            <div className='md:max-w-[800px] md:w-full md:mx-auto w-[430px] h-auto top-48  sm:top-16 mx-auto pb-36 sm:pb-5 relative pt-24   sm:mx-auto sm:w-[600px] sm:px-3 sm:relative'>
                <h1 className={` ${darkMode ? "text-white" : "text-black"} text-lg md:text-xl font-semibold font-['Inter']`}>
                    {fromCurrency} to {toCurrency} Converter Chart
                </h1>
                <span className={darkMode ? "text-white" : "text-[#244e6d] h-[23px] text-xl font-bold font-['Inter']"}>
                    <LastUpdateInfo fromCurrency={fromCurrency} toCurrency={toCurrency} />
                </span>
                <p className={` ${darkMode ? "text-white" : "text-black"} text-sm font-normal font-['Inter'] flex justify-center items-center pb-5`}>
                    Time Period
                </p>
                <div className='flex flex-wrap gap-3 justify-center'>
                    <button
                        onClick={() => setTimePeriod('48h')}
                        className={` ${timePeriod === '48h' ? 'bg-[#244e6d] text-white' : darkMode ? "border-[#c0c0c0] text-[#c0c0c0]" : "border-[#244e6d] text-[#244e6d]"} w-[81px] h-[29px] px-2 py-1.5 hover:bg-[#244e6d] hover:text-white rounded-[61px] border flex justify-center items-center  text-sm font-normal font-['Inter']`}
                    >
                        48 Hours
                    </button>
                    <button
                        onClick={() => setTimePeriod('1w')}
                        className={` ${timePeriod === '1w' ? 'bg-[#244e6d] text-white' : darkMode ? "border-[#c0c0c0] text-[#c0c0c0]" : "border-[#244e6d] text-[#244e6d]"} w-[81px] h-[29px] px-2 py-1.5 hover:bg-[#244e6d] hover:text-white rounded-[61px] border flex justify-center items-center  text-sm font-normal font-['Inter']`}
                    >
                        1 Week
                    </button>
                    <button
                        onClick={() => setTimePeriod('1m')}
                        className={` ${timePeriod === '1m' ? 'bg-[#244e6d] text-white' : darkMode ? "border-[#c0c0c0] text-[#c0c0c0]" : "border-[#244e6d] text-[#244e6d]"} w-[81px] h-[29px] px-2 py-1.5 hover:bg-[#244e6d] hover:text-white rounded-[61px] border flex justify-center items-center  text-sm font-normal font-['Inter']`}
                    >
                        1 Month
                    </button>
                    <button
                        onClick={() => setTimePeriod('6m')}
                        className={` ${timePeriod === '6m' ? 'bg-[#244e6d] text-white' : darkMode ? "border-[#c0c0c0] text-[#c0c0c0]" : "border-[#244e6d] text-[#244e6d]"} w-[81px] h-[29px] px-2 py-1.5 hover:bg-[#244e6d] hover:text-white rounded-[61px] border flex justify-center items-center text-sm font-normal font-['Inter']`}
                    >
                        6 Months
                    </button>
                    <button
                        onClick={() => setTimePeriod('1y')}
                        className={` ${timePeriod === '1y' ? 'bg-[#244e6d] text-white' : darkMode ? "border-[#c0c0c0] text-[#c0c0c0]" : "border-[#244e6d] text-[#244e6d]"} w-[81px] h-[29px] px-2 py-1.5 hover:bg-[#244e6d] hover:text-white rounded-[61px] border flex justify-center items-center text-sm font-normal font-['Inter']`}
                    >
                        1 Year
                    </button>
                    <button
                        onClick={() => setTimePeriod('5y')}
                        className={` ${timePeriod === '5y' ? 'bg-[#244e6d] text-white' : darkMode ? "border-[#c0c0c0] text-[#c0c0c0]" : "border-[#244e6d] text-[#244e6d]"} w-[81px] h-[29px] px-2 py-1.5 hover:bg-[#244e6d] hover:text-white rounded-[61px] border flex justify-center items-center text-sm font-normal font-['Inter']`}
                    >
                        5 Years
                    </button>
                </div>
                <Line data={chartData} className={`${darkMode ? "bg-[#3c3c3c]" : ""} mt-5`} />
            </div>
        </div>
    );
};

export default HistoricalRatesGraph;
