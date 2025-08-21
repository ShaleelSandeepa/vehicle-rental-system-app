import React from 'react';
import { Button } from '../ui/button';
import { Menu, Bell, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Header({ onMenuClick }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="font-serif text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                {user && <span className="hidden md:inline">{user.name}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}