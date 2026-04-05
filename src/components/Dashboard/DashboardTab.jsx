// src/components/Dashboard/DashboardTab.jsx
import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SummaryCard from './SummaryCard';
import EmptyState from '../Shared/EmptyState';

export default function DashboardTab({ transactions, isDark }) {
  const { totalIncome, totalExpense, balance, chartData, pieData } = useMemo(() => {
    let inc = 0, exp = 0;
    const catTotals = {};
    const dateTotals = {};

    transactions.forEach(tx => {
      if (tx.type === 'income') inc += tx.amount;
      else {
        exp += tx.amount;
        catTotals[tx.category] = (catTotals[tx.category] || 0) + tx.amount;
      }
      
      const dateKey = tx.date.split(',')[0]; 
      dateTotals[dateKey] = (dateTotals[dateKey] || 0) + (tx.type === 'income' ? tx.amount : -tx.amount);
    });

    const colors = ['#3b82f6', '#ef4444', '#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    const pData = Object.keys(catTotals).map((name, i) => ({
      name, value: catTotals[name], color: colors[i % colors.length]
    })).sort((a,b) => b.value - a.value);

    let runningBalance = 0;
    const sortedDates = Object.keys(dateTotals).sort((a, b) => new Date(a + " 2026") - new Date(b + " 2026"));
    const cData = sortedDates.map(date => {
      runningBalance += dateTotals[date];
      return { date, balance: runningBalance };
    });

    return { totalIncome: inc, totalExpense: exp, balance: inc - exp, chartData: cData.slice(-10), pieData: pData };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
          <SummaryCard title="Total Balance" amount={balance} icon="$" color={balance >= 0 ? "text-slate-900 dark:text-white" : "text-red-600 dark:text-red-400"} bg="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <SummaryCard title="Total Income" amount={totalIncome} icon={<TrendingUp size={20} />} color="text-green-600 dark:text-green-400" bg="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <SummaryCard title="Total Expenses" amount={totalExpense} icon={<TrendingDown size={20} />} color="text-red-600 dark:text-red-400" bg="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-6 transition-colors">Balance Trend (Recent)</h3>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12}} dx={-10} tickFormatter={v => `$${v}`} />
                  <Tooltip 
                    contentStyle={{backgroundColor: isDark ? '#1e293b' : '#fff', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px', border: isDark ? '1px solid #334155' : 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                  />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: isDark ? '#1e293b' : '#fff' }} activeDot={{ r: 6 }} animationDuration={1000} />
                </LineChart>
              </ResponsiveContainer>
            ) : <EmptyState message="Not enough data for trend" />}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="font-semibold text-slate-800 dark:text-white mb-6 transition-colors">Spending Breakdown</h3>
          <div className="h-64">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none" animationDuration={1000}>
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{backgroundColor: isDark ? '#1e293b' : '#fff', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px', border: isDark ? '1px solid #334155' : 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : <EmptyState message="No expenses to display" />}
          </div>
          {pieData.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {pieData.slice(0, 4).map(d => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:scale-105 transition-transform duration-200 cursor-default">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                  {d.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}