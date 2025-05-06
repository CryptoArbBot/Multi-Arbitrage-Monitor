import React from 'react';
import { LayoutDashboard, Cpu, LineChart, BarChart3, Wallet, Users, Settings, HelpCircle } from 'lucide-react';

interface SidebarLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

const Sidebar: React.FC = () => {
  const links: SidebarLink[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '#', active: true },
    { name: 'Arbitrage', icon: <Cpu size={20} />, href: '#' },
    { name: 'Trading', icon: <LineChart size={20} />, href: '#' },
    { name: 'Exchanges', icon: <BarChart3 size={20} />, href: '#' },
    { name: 'Portfolio', icon: <Wallet size={20} />, href: '#' },
    { name: 'Community', icon: <Users size={20} />, href: '#' },
  ];
  
  const bottomLinks: SidebarLink[] = [
    { name: 'Settings', icon: <Settings size={20} />, href: '#' },
    { name: 'Help', icon: <HelpCircle size={20} />, href: '#' },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed top-0 left-0 z-20 pt-16 w-64 h-screen transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="h-full px-3 pb-4 pt-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className={`
                  flex items-center p-2 rounded-lg group
                  ${link.active 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className={`${link.active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {link.icon}
                </span>
                <span className="ml-3">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-2 font-medium">
            {bottomLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="flex items-center p-2 text-gray-700 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="text-gray-500 dark:text-gray-400">
                    {link.icon}
                  </span>
                  <span className="ml-3">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;