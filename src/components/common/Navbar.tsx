import React, { useState } from 'react';
import { Bell, Sun, Moon, ChevronDown, Menu, X, Activity } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import Badge from '../ui/Badge';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, alerts, logout } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const unreadAlerts = alerts.filter(alert => !alert.read).length;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-30 top-0">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center justify-start">
            <button 
              className="lg:hidden p-2 mr-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <a href="#" className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600 mr-2" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                ArbitrageWatch<span className="text-blue-600 font-bold">Pro</span>
              </span>
            </a>
          </div>

          {/* Top Navigation (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <button 
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => toggleTheme()}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={18} />
                {unreadAlerts > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {unreadAlerts}
                  </span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {alerts.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        No notifications
                      </div>
                    ) : (
                      alerts.map(alert => (
                        <div 
                          key={alert.id} 
                          className={`
                            px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0
                            ${alert.read ? 'opacity-70' : 'bg-blue-50 dark:bg-blue-900/20'}
                          `}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              {alert.type === 'success' && (
                                <Badge variant="success" size="sm">Success</Badge>
                              )}
                              {alert.type === 'warning' && (
                                <Badge variant="warning" size="sm">Warning</Badge>
                              )}
                              {alert.type === 'info' && (
                                <Badge variant="info" size="sm">Info</Badge>
                              )}
                              {alert.type === 'error' && (
                                <Badge variant="danger" size="sm">Error</Badge>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 dark:text-gray-200">
                                {alert.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(alert.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img 
                  className="w-8 h-8 rounded-full" 
                  src={user?.avatar} 
                  alt={user?.name}
                />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role === 'premium' ? 'Premium' : user?.role === 'enterprise' ? 'Enterprise' : 'Free'}
                  </div>
                </div>
                <ChevronDown size={16} />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <ul className="py-1">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        API Keys
                      </a>
                    </li>
                    <li className="border-t border-gray-200 dark:border-gray-700">
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Icons */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button 
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => toggleTheme()}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button 
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={18} />
              {unreadAlerts > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {unreadAlerts}
                </span>
              )}
            </button>
            
            <img 
              className="w-8 h-8 rounded-full cursor-pointer" 
              src={user?.avatar} 
              alt={user?.name}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <ul className="py-2 px-4 space-y-1">
            <li>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Arbitrage Monitor
              </a>
            </li>
            <li>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Trading
              </a>
            </li>
            <li>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Portfolio
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;