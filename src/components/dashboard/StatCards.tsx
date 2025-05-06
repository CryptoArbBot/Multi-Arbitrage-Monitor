import React from 'react';
import { TrendingUp, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';

const StatCards: React.FC = () => {
  const stats = [
    {
      title: 'Active Opportunities',
      value: '24',
      change: '+8 today',
      trend: 'up',
      icon: <TrendingUp size={20} className="text-green-500" />,
      color: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Highest Profit',
      value: '1.32%',
      change: '$421.87 est.',
      trend: 'up',
      icon: <ArrowUpRight size={20} className="text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Avg. Execution Time',
      value: '3.2s',
      change: '0.8s faster today',
      trend: 'up',
      icon: <Clock size={20} className="text-purple-500" />,
      color: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Market Volatility',
      value: 'Medium',
      change: 'Trending Higher',
      trend: 'up',
      icon: <AlertCircle size={20} className="text-yellow-500" />,
      color: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.color} border-none`}>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.textColor}`}>
                {stat.value}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.change}
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-full`}>
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;