import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon, LogOut, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <ShieldAlert className="text-blue-600 dark:text-blue-400" size={28} />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Si Peka
          </h1>
        </Link>

        {/* Right Nav */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Controls */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
              <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-400 border-l border-slate-300 dark:border-slate-600 pl-4">
                Hai, {user.username}
              </span>
              <button 
                onClick={handleLogout} 
                className="text-sm flex items-center px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={16} className="mr-1.5" /> Keluar
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-all"
            >
              Masuk / Daftar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
