// src/presentation/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/dashboard',
      active: true
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: BarChart3,
      path: '/projects',
      active: false
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
      path: '/team',
      active: false
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      path: '/calendar',
      active: false
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      path: '/notifications',
      active: false,
      badge: 3
    }
  ];

  const bottomItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      action: () => console.log('Navigate to settings')
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
      action: onLogout
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const NavigationItem = ({ item }) => {
    const handleClick = () => {
      if (item.action) {
        item.action();
      } else {
        console.log(`Navigate to ${item.path}`);
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`
          group relative w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400
          ${item.active 
            ? 'bg-white text-violet-700 shadow-md' 
            : 'text-violet-200 hover:bg-violet-600 hover:text-white'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
        aria-label={item.label}
        title={isCollapsed ? item.label : ''}
      >
        <item.icon className={`
          flex-shrink-0 transition-all duration-300
          ${item.active ? 'text-violet-700' : 'text-current'}
          ${isCollapsed ? 'h-6 w-6' : 'h-5 w-5'}
        `} />
        
        {!isCollapsed && (
          <>
            <span className="font-medium truncate">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.label}
            {item.badge && (
              <span className="ml-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <aside className={`
      relative h-screen bg-violet-700 dark:bg-violet-900 border-r border-violet-600 dark:border-violet-800 flex flex-col transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-violet-600 dark:border-violet-800">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-500/80 backdrop-blur rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">LanceHawks</h2>
              <p className="text-violet-200 text-xs">Admin Hub</p>
            </div>
          </div>
        )}
        
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-violet-600/50 hover:bg-violet-600 text-violet-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* User Profile */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-violet-600 dark:border-violet-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-semibold">
              {user.getInitials ? user.getInitials() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">
                {user.getDisplayName ? user.getDisplayName() : user.email || 'User'}
              </p>
              <p className="text-violet-200 text-sm truncate">{user.email || ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavigationItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 py-4 border-t border-violet-600 dark:border-violet-800 space-y-2">
        {bottomItems.map((item) => (
          <NavigationItem key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;