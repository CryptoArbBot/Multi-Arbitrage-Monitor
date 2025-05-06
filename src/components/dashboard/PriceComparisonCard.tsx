import React, { useState } from 'react';
import { ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../ui/Card';
import { CryptoPair, PriceData } from '../../types';

interface PriceComparisonCardProps {
  pairs: CryptoPair[];
  priceData: Record<string, PriceData[]>;
}

const PriceComparisonCard: React.FC<PriceComparisonCardProps> = ({ pairs, priceData }) => {
  const [selectedPair, setSelectedPair] = useState<string>(pairs[0]?.id || '');
  
  const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPair(e.target.value);
  };
  
  const selectedPairData = priceData[selectedPair] || [];
  
  // Sort exchanges by price (highest to lowest)
  const sortedExchanges = [...selectedPairData].sort((a, b) => b.price - a.price);
  
  // Calculate the price difference percentage between highest and lowest
  const highestPrice = sortedExchanges[0]?.price || 0;
  const lowestPrice = sortedExchanges[sortedExchanges.length - 1]?.price || 0;
  const priceDifference = highestPrice - lowestPrice;
  const priceDifferencePercentage = (priceDifference / lowestPrice) * 100;

  return (
    <Card 
      title="Price Comparison" 
      subtitle="Compare prices across exchanges to identify arbitrage opportunities"
      headerAction={
        <select
          value={selectedPair}
          onChange={handlePairChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {pairs.map((pair) => (
            <option key={pair.id} value={pair.id}>
              {pair.name}
            </option>
          ))}
        </select>
      }
    >
      {selectedPairData.length > 0 ? (
        <>
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Current Spread</span>
                <div className="flex items-center mt-1">
                  <ChevronsUpDown size={16} className="mr-1 text-blue-600 dark:text-blue-400" />
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {priceDifferencePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Difference</span>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  ${priceDifference.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            {sortedExchanges.map((data, index) => {
              const isHighest = index === 0;
              const isLowest = index === sortedExchanges.length - 1;
              const priceDiffFromHighest = isHighest ? 0 : ((highestPrice - data.price) / data.price) * 100;
              
              return (
                <div 
                  key={data.exchange}
                  className={`
                    p-3 rounded-lg flex items-center justify-between
                    ${isHighest ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : 
                      isLowest ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500' : 
                      'bg-gray-50 dark:bg-gray-700/50'}
                  `}
                >
                  <div className="flex items-center">
                    {isHighest && <ArrowUp size={16} className="mr-1 text-green-600 dark:text-green-400" />}
                    {isLowest && <ArrowDown size={16} className="mr-1 text-red-600 dark:text-red-400" />}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {data.exchange}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">
                      ${data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    {!isHighest && (
                      <div className="text-xs text-red-600 dark:text-red-400">
                        {priceDiffFromHighest.toFixed(2)}% lower
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Last updated: {new Date(selectedPairData[0]?.lastUpdated || '').toLocaleTimeString()}
          </div>
        </>
      ) : (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No price data available for the selected pair.
        </div>
      )}
    </Card>
  );
};

export default PriceComparisonCard;