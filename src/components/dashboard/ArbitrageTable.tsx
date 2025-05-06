import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ArbitrageOpportunity } from '../../types';

interface ArbitrageTableProps {
  data: ArbitrageOpportunity[];
  isLoading?: boolean;
}

const ArbitrageTable: React.FC<ArbitrageTableProps> = ({ data, isLoading = false }) => {
  const formatProfit = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getRiskVariant = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getTypeVariant = (type: 'cross-exchange' | 'triangular' | 'dex') => {
    switch (type) {
      case 'cross-exchange':
        return 'primary';
      case 'triangular':
        return 'secondary';
      case 'dex':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatType = (type: 'cross-exchange' | 'triangular' | 'dex') => {
    switch (type) {
      case 'cross-exchange':
        return 'Cross-Exchange';
      case 'triangular':
        return 'Triangular';
      case 'dex':
        return 'DEX';
      default:
        return type;
    }
  };

  const columns = [
    {
      header: 'Type',
      accessor: (row: ArbitrageOpportunity) => row.type,
      cell: (row: ArbitrageOpportunity) => (
        <Badge variant={getTypeVariant(row.type)} size="sm">
          {formatType(row.type)}
        </Badge>
      ),
    },
    {
      header: 'Asset',
      accessor: (row: ArbitrageOpportunity) => row.asset,
    },
    {
      header: 'Source → Target',
      accessor: (row: ArbitrageOpportunity) => 'path',
      cell: (row: ArbitrageOpportunity) => (
        <div className="flex items-center">
          <span className="text-gray-700 dark:text-gray-300">{row.sourceExchange}</span>
          <ArrowRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">{row.targetExchange}</span>
        </div>
      ),
    },
    {
      header: 'Profit',
      accessor: (row: ArbitrageOpportunity) => row.profitPercentage,
      cell: (row: ArbitrageOpportunity) => (
        <div className="font-medium text-green-600 dark:text-green-400 flex items-center">
          <TrendingUp size={16} className="mr-1" />
          {formatPercentage(row.profitPercentage)}
        </div>
      ),
    },
    {
      header: 'Est. Return',
      accessor: (row: ArbitrageOpportunity) => row.estimatedProfit,
      cell: (row: ArbitrageOpportunity) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {formatProfit(row.estimatedProfit)}
        </div>
      ),
    },
    {
      header: 'Risk',
      accessor: (row: ArbitrageOpportunity) => row.risk,
      cell: (row: ArbitrageOpportunity) => (
        <Badge variant={getRiskVariant(row.risk)}>
          {row.risk.charAt(0).toUpperCase() + row.risk.slice(1)}
        </Badge>
      ),
    },
    {
      header: '',
      accessor: (row: ArbitrageOpportunity) => 'actions',
      cell: (row: ArbitrageOpportunity) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Details
          </Button>
          <Button variant="primary" size="sm">
            Trade
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table 
      data={data} 
      columns={columns} 
      isLoading={isLoading}
      emptyMessage="No arbitrage opportunities found at the moment."
    />
  );
};

export default ArbitrageTable;