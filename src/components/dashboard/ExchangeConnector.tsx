import React from 'react';
import { CheckCircle, XCircle, Link } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Exchange } from '../../types';

interface ExchangeConnectorProps {
  exchanges: Exchange[];
}

const ExchangeConnector: React.FC<ExchangeConnectorProps> = ({ exchanges }) => {
  return (
    <Card 
      title="Exchange Connections" 
      subtitle="Connect your exchange accounts to enable live arbitrage trading"
    >
      <div className="space-y-3">
        {exchanges.map((exchange) => (
          <div 
            key={exchange.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-8 w-8 mr-3">
                <img 
                  src={exchange.logo} 
                  alt={exchange.name} 
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {exchange.name}
                </p>
                <div className="flex items-center mt-1">
                  {exchange.isConnected ? (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle size={14} className="mr-1" />
                      <span className="text-xs">Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <XCircle size={14} className="mr-1" />
                      <span className="text-xs">Not connected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button 
              variant={exchange.isConnected ? 'outline' : 'primary'} 
              size="sm"
              leftIcon={<Link size={16} />}
            >
              {exchange.isConnected ? 'Reconfigure' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExchangeConnector;