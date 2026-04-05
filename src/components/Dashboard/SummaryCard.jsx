import React from 'react';

export default function SummaryCard({ title, amount, icon, color, bg }) {
  // Updated to Indian Rupees formatting
  const formattedAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  
  return (
    <div className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-500 cursor-default">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 transition-colors">{title}</p>
        <p className={`text-3xl font-bold tracking-tight ${color} transition-colors`}>{formattedAmount.replace('-₹', '₹-')}</p>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${bg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        {icon}
      </div>
    </div>
  );
}