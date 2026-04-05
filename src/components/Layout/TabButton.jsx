// src/components/Layout/TabButton.jsx
import React from 'react';

export default function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-all duration-300 ${
        active 
          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
          : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
      }`}
    >
      <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}>{icon}</span> 
      {label}
    </button>
  );
}