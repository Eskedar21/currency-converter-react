// HistoricalRatesGraph.js
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

const HistoricalRatesGraph = ({ fromCurrency, toCurrency }) => {
    const [timePeriod, setTimePeriod] = useState('7d'); // Default 1 week
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
                    startDate.setDate(today.getDate() - 7);
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
        <div className="w-screen h-[600px] relative bg-white z-0 mt-5 ">
        <div className='max-w-[800px] mx-auto my-56 '>
             <h2 className="text-black text-lg font-semibold font-['Inter']">{fromCurrency} to {toCurrency} Convertor Chart</h2>
           <span className="h-[23px] text-[#244e6d] text-xl font-bold font-['Inter']"><LastUpdateInfo fromCurrency={fromCurrency} toCurrency={toCurrency} /> </span> {/* Last update info */}
            <p className="text-black text-sm font-normal font-['Inter'] flex justify-center items-center pb-5">Time Period</p>
            <div className='flex gap-3'>
                <button onClick={() => setTimePeriod('48h')} className="w-[81px] h-[29px] px-2 py-1.5 rounded-[61px] border border-[#244e6d] justify-center items-center gap-2.5 inline-flex text-[#244e6d] text-sm font-normal font-['Inter']">48 Hours</button>
                <button onClick={() => setTimePeriod('1w')} className="w-[81px] h-[29px] px-2 py-1.5 rounded-[61px] border border-[#244e6d] justify-center items-center gap-2.5 inline-flex text-[#244e6d] text-sm font-normal font-['Inter']">1 Week</button>
                <button onClick={() => setTimePeriod('1m')} className="w-[81px] h-[29px] px-2 py-1.5 bg-[#244e6d] rounded-[61px] justify-center items-center gap-2.5 inline-flex  text-white text-sm font-normal font-['Inter']">1 Month</button>
                <button onClick={() => setTimePeriod('6m')} className="w-[81px] h-[29px] px-2 py-1.5 rounded-[61px] border border-[#244e6d] justify-center items-center gap-2.5 inline-flex text-[#244e6d] text-sm font-normal font-['Inter']">6 Months</button>
                <button onClick={() => setTimePeriod('1y')} className="w-[81px] h-[29px] px-2 py-1.5 rounded-[61px] border border-[#244e6d] justify-center items-center gap-2.5 inline-flex text-[#244e6d] text-sm font-normal font-['Inter']">1 Year</button>
                <button onClick={() => setTimePeriod('5y')} className="w-[81px] h-[29px] px-2 py-1.5 rounded-[61px] border border-[#244e6d] justify-center items-center gap-2.5 inline-flex text-[#244e6d] text-sm font-normal font-['Inter']">5 Years</button>
            </div>
            <Line data={chartData} className='mt-5' />
        </div>
         
         <div className="w-screen h-[500px] bg-[#244e6d] relative"></div>
           
        </div>
    );
};

export default HistoricalRatesGraph;
