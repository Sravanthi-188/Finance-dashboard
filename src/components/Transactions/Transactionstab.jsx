// src/components/Transactions/TransactionsTab.jsx
import React, { useState, useMemo } from 'react';
import { Search, Trash2, Plus, Download, ArrowUpDown } from 'lucide-react';
import AddTransactionModal from './AddTransactionModal';
import { CATEGORIES } from '../../data/constants';

export default function TransactionsTab({ role, transactions, setTransactions }) {
  const [filters, setFilters] = useState({ search: '', type: 'All Types', category: 'All Categories' });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedTransactions = useMemo(() => {
    let result = transactions.filter(tx => {
      const matchSearch = tx.desc.toLowerCase().includes(filters.search.toLowerCase()) || 
                          tx.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === 'All Types' || tx.type === filters.type.toLowerCase();
      const matchCategory = filters.category === 'All Categories' || tx.category.toLowerCase() === filters.category.toLowerCase();
      return matchSearch && matchType && matchCategory;
    });

    result.sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.date) - new Date(b.date) 
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

    return result;
  }, [transactions, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key, direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(tx => tx.id !== id));
    }
  };

  const handleAdd = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedTransactions.map(tx => `"${tx.date}","${tx.desc}","${tx.category}","${tx.type}",${tx.amount}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'financial_transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white">Transactions List</h3>
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 active:scale-95"
            >
              <Download size={16} /> Export CSV
            </button>
            {role === 'admin' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-300 active:scale-95"
              >
                <Plus size={16} /> Add New
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300" size={18} />
            <input 
              type="text" 
              placeholder="Search descriptions..." 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300" 
            />
          </div>
          <select 
            value={filters.type}
            onChange={(e) => setFilters(prev => ({...prev, type: e.target.value}))}
            className="border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer"
          >
            <option>All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
          <select 
            value={filters.category}
            onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
            className="border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button 
            onClick={() => setFilters({ search: '', type: 'All Types', category: 'All Categories' })}
            className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 active:scale-95"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <tr>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1 group">Date <ArrowUpDown size={14} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" /></div>
              </th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-right" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1 group">Amount <ArrowUpDown size={14} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" /></div>
              </th>
              {role === 'admin' && <th className="px-6 py-4 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredAndSortedTransactions.map((tx, idx) => (
              <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{tx.desc}</td>
                <td className="px-6 py-4">
                  <span className="bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full text-xs transition-colors duration-300 hover:shadow-sm">{tx.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-300 hover:shadow-sm ${tx.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right whitespace-nowrap font-medium ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDelete(tx.id)} className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 p-1 rounded-md hover:bg-red-50 dark:hover:bg-slate-700 hover:scale-110 active:scale-95">
                      <Trash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {filteredAndSortedTransactions.length === 0 && (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 animate-fade-in">
                  <div className="flex flex-col items-center justify-center">
                    <Search size={32} className="text-slate-300 dark:text-slate-600 mb-2" />
                    <p>No transactions found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && <AddTransactionModal onClose={() => setIsModalOpen(false)} onAdd={handleAdd} />}
    </div>
  );
}