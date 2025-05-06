import React from 'react';
import StatCards from '../components/dashboard/StatCards';
import ArbitrageTable from '../components/dashboard/ArbitrageTable';
import PriceComparisonCard from '../components/dashboard/PriceComparisonCard';
import ExchangeConnector from '../components/dashboard/ExchangeConnector';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import { mockArbitrageOpportunities, mockExchanges, mockCryptoPairs, mockPriceData, mockPortfolio } from '../utils/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceComparisonCard pairs={mockCryptoPairs} priceData={mockPriceData} />
        </div>
        <div>
          <PortfolioSummary assets={mockPortfolio} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Active Arbitrage Opportunities</h2>
          <ArbitrageTable data={mockArbitrageOpportunities} />
        </div>
        <div>
          <ExchangeConnector exchanges={mockExchanges} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;