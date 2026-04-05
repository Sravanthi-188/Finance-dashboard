// src/App.jsx
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, List, Lightbulb, CheckCircle2, Eye } from 'lucide-react';
import Header from './components/Layout/Header';
import TabButton from './components/Layout/TabButton';
import DashboardTab from './components/Dashboard/DashboardTab';
import TransactionsTab from './components/Transactions/TransactionsTab';
import InsightsTab from './components/Insights/InsightsTab';
import { INITIAL_TRANSACTIONS } from './data/constants';

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [role, setRole] = useState('admin');
  
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('finance-dashboard-theme');
    return saved === 'dark';
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance-dashboard-tx');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem('finance-dashboard-tx', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance-dashboard-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
        
        <Header role={role} setRole={setRole} isDark={isDark} setIsDark={setIsDark} />

        <div className={`border-b dark:border-slate-700 px-6 py-2 text-sm flex items-center gap-2 transition-colors duration-300 ${
          role === 'admin' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        }`}>
          {role === 'admin' ? (
            <><CheckCircle2 size={14} className="animate-fade-in" /> Admin mode: You can view, add, edit, and delete transactions. Data is saved locally.</>
          ) : (
            <><Eye size={14} className="animate-fade-in" /> Viewer mode: You can only view and export data.</>
          )}
        </div>

        <div className="px-6 border-b dark:border-slate-700 bg-white dark:bg-slate-800 overflow-x-auto transition-colors duration-300">
          <div className="flex gap-8 min-w-max relative">
            <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard Overview" />
            <TabButton active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} icon={<List size={18} />} label="Transactions" />
            <TabButton active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} icon={<Lightbulb size={18} />} label="Data Insights" />
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-7xl mx-auto animate-fade-in">
          {activeTab === 'dashboard' && <DashboardTab transactions={transactions} isDark={isDark} />}
          {activeTab === 'transactions' && <TransactionsTab role={role} transactions={transactions} setTransactions={setTransactions} isDark={isDark} />}
          {activeTab === 'insights' && <InsightsTab transactions={transactions} isDark={isDark} />}
        </div>
      </div>
    </div>
  );
}