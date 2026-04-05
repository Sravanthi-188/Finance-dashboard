import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function EmptyState({ message }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 py-12 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center mb-3 transition-all duration-300 hover:scale-110">
        <Lightbulb size={24} className="text-slate-300 dark:text-slate-600 transition-colors" />
      </div>
      <p className="text-sm transition-colors">{message}</p>
    </div>
  );
}