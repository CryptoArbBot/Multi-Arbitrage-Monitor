import React from 'react';
import { PieChart, DollarSign, Percent, ArrowUpCircle } from 'lucide-react';
import Card from '../ui/Card';
import { PortfolioAsset } from '../../types';

interface PortfolioSummaryProps {
  assets: PortfolioAsset[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ assets }) => {
  // Calculate total portfolio value
  const totalValue = assets.reduce((total, asset) => total + asset.valueUSD, 0);
  
  // Sort assets by value (descending)
  const sortedAssets = [...assets].sort((a, b) => b.valueUSD - a.valueUSD);
  
  // Extract top assets for display
  const topAssets = sortedAssets.slice(0, 4);
  
  // Calculate other assets if there are more than 4
  const otherAssets = sortedAssets.slice(4);
  const otherAssetsValue = otherAssets.reduce((total, asset) => total + asset.valueUSD, 0);
  const otherAssetsAllocation = otherAssets.reduce((total, asset) => total + asset.allocation, 0);

  // Generate random colors for the chart
  const generateColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-gray-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <Card title="Portfolio Overview" subtitle="Your current assets and allocations">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-4">
          <div className="flex items-center justify-center h-full">
            <div className="relative w-36 h-36">
              <PieChart size={144} className="text-gray-300 dark:text-gray-600" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  ${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Value</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full sm:w-1/2">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Allocation</h4>
          <div className="space-y-2">
            {topAssets.map((asset, index) => (
              <div key={asset.asset} className="flex items-center">
                <div className={`w-2 h-8 ${generateColor(index)} rounded-sm mr-2`}></div>
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{asset.asset}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({asset.amount.toLocaleString('en-US', { maximumFractionDigits: 4 })})
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {asset.allocation.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
            
            {otherAssets.length > 0 && (
              <div className="flex items-center">
                <div className="w-2 h-8 bg-gray-400 rounded-sm mr-2"></div>
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Other</span>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {otherAssetsAllocation.toFixed(1)}%
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <DollarSign size={16} className="text-blue-600 dark:text-blue-400 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Value</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            ${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <Percent size={16} className="text-purple-600 dark:text-purple-400 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24h Change</span>
          </div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            +3.2%
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <ArrowUpCircle size={16} className="text-green-600 dark:text-green-400 mr-1" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Best Performer</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            SOL +8.4%
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioSummary;