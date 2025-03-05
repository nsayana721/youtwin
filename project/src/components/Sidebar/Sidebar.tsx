import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { SidebarFoldIcon, SidebarUnfoldIcon } from '../Icons/SidebarIcons';
import { MarketplaceIcon } from '../Icons/MarketplaceIcon';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { MyTwinsIcon } from '../Icons/MyTwinsIcon';
import { MyTermsIcon } from '../Icons/MyTermsIcon';
import { FolderIcon } from '../Icons/FolderIcon';
import { ChatHistorySection } from './ChatHistorySection';

const menuItems = [
  { icon: MarketplaceIcon, label: 'Marketplace', path: '/marketplace' },
  { icon: MyTwinsIcon, label: 'My Twins', path: '/mytwins' },
  { icon: MyTermsIcon, label: 'My Terms', path: '/terms' },
  { icon: Share2, label: 'My Shared', path: '/shared' },
];

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (collapsed) {
      setIsExpanded(false);
    }
  }, [collapsed]);

  return (
    <div className={`h-screen ${isExpanded ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 sticky top-0`}>
      <div className={`p-6 ${isExpanded ? 'flex items-center justify-between' : 'flex flex-col items-center'}`}>
        <div className="flex items-center gap-3">
          <img 
            src="https://lh3.googleusercontent.com/pw/AP1GczOtbcHjWvkOBHUqwZsbATJMSAqxqOrh4xNyqTypE0dHvwdHRqwrGiSZ638RlmnRCEiW9tl1zAwrwko9y-pCmJTCiPq4G2LroQuRbzZww0gSUqQwujqQENTUxw82D9MtQfeX5xoqBFGxFZOKuY-NOsB2FA=w969-h771-s-no-gm?authuser=0"
            alt="YouTwin Logo"
            className="w-8 h-8 object-contain"
          />
          {isExpanded && (
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Futura, system-ui' }}>YouTwin</h1>
          )}
        </div>
        {isExpanded ? (
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-600 hover:text-primary-500 transition-colors"
          >
            <SidebarFoldIcon className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-gray-600 hover:text-primary-500 transition-colors mt-4"
          >
            <SidebarUnfoldIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center ${isExpanded ? 'px-6' : 'justify-center'} py-3 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isExpanded ? 'mr-3' : ''}`} />
                {isExpanded && item.label}
              </Link>
            </li>
          ))}
        </ul>

        <ChatHistorySection isExpanded={isExpanded} />
      </nav>

      <div className={`p-6 border-t border-gray-200 ${isExpanded ? '' : 'flex justify-center'}`}>
        <button className={`flex items-center text-gray-600 hover:text-primary-500 ${isExpanded ? '' : 'justify-center w-full'}`}>
          <LogoutIcon className={`w-5 h-5 ${isExpanded ? 'mr-3' : ''}`} />
          {isExpanded && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );
}