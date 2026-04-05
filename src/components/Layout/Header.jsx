// src/components/Layout/Header.jsx
import React from 'react';
import { Moon, Sun, Eye, Shield } from 'lucide-react';

export default function Header({ role, setRole, isDark, setIsDark }) {
  return (
    <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Finance Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track and understand your financial activity</p>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all duration-300 active:scale-90"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} className="animate-fade-in" /> : <Moon size={20} className="animate-fade-in" />}
        </button>
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 transition-colors duration-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Role:</span>
          <button 
            onClick={() => setRole('viewer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 active:scale-95 ${
              role === 'viewer' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            <Eye size={16} /> Viewer
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 active:scale-95 ${
              role === 'admin' ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            <Shield size={16} /> Admin
          </button>
        </div>
      </div>
    </div>
  );
}