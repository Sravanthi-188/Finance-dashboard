// src/components/Insights/InsightsTab.jsx
import React from 'react';
import { TrendingDown, List, Calendar, Lightbulb } from 'lucide-react';
import EmptyState from '../Shared/EmptyState';

export default function InsightsTab({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const catTotals = {};
  expenses.forEach(t => catTotals[t.category] = (catTotals[t.category] || 0) + t.amount);
  
  const topCategory = Object.keys(catTotals).reduce((a, b) => catTotals[a] > catTotals[b] ? a : b, '') || 'None';
  const topAmount = catTotals[topCategory] || 0;
  
  const totalExp = expenses.reduce((sum, t) => sum + t.amount, 0);
  const avgTransaction = expenses.length > 0 ? (totalExp / expenses.length).toFixed(2) : 0;
  
  const topPercentage = totalExp > 0 ? ((topAmount / totalExp) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-6 transition-all duration-300 animate-fade-in">
      <h3 className="font-semibold text-lg text-slate-800 dark:text-white transition-colors">Financial Insights & Patterns</h3>
      
      {transactions.length === 0 ? (
        <EmptyState message="Add transactions to generate insights" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-2 mb-2 text-red-700 dark:text-red-400 transition-colors">
                <TrendingDown size={18} className="animate-pulse" />
                <span className="text-sm font-semibold uppercase tracking-wider">Top Expense</span>
              </div>
              <div className="text-red-900 dark:text-red-300 font-medium mb-1 transition-colors">{topCategory}</div>
              <div className="text-3xl font-bold text-red-700 dark:text-red-400 transition-colors">${topAmount.toLocaleString()}</div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-400 transition-colors">
                <List size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider">Avg Transaction</span>
              </div>
              <div className="text-blue-900 dark:text-blue-300 font-medium mb-1 transition-colors">Per Expense Entry</div>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400 transition-colors">${avgTransaction}</div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-100 dark:border-green-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-2 mb-2 text-green-800 dark:text-green-400 transition-colors">
                <Calendar size={18} />
                <span className="text-sm font-semibold uppercase tracking-wider">Activity Volume</span>
              </div>
              <div className="text-green-900 dark:text-green-300 font-medium mb-1 transition-colors">Total Records</div>
              <div className="text-3xl font-bold text-green-700 dark:text-green-400 transition-colors">{transactions.length}</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-6 transition-all duration-300 hover:shadow-sm">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2 transition-colors">
              <Lightbulb className="text-yellow-500 animate-pulse" size={20} /> Smart Observations
            </h4>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2 group transition-colors">
                <div className="min-w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 group-hover:scale-150 transition-transform duration-300"></div>
                <p>Your highest spending category is <strong className="dark:text-white transition-colors">{topCategory}</strong>, making up <strong className="dark:text-white transition-colors">{topPercentage}%</strong> of all your tracked expenses.</p>
              </li>
              <li className="flex items-start gap-2 group transition-colors">
                <div className="min-w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 group-hover:scale-150 transition-transform duration-300"></div>
                <p>You have recorded a total of <strong className="dark:text-white transition-colors">{expenses.length}</strong> expenses and <strong className="dark:text-white transition-colors">{transactions.length - expenses.length}</strong> income events.</p>
              </li>
              {topPercentage > 40 && (
                <li className="flex items-start gap-2 group transition-colors">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-orange-700 dark:text-orange-400 transition-colors">Watch out: Your spending is highly concentrated in one category. Consider diversifying your budget.</p>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}