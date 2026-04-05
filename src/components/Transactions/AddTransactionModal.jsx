// src/components/Transactions/AddTransactionModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../../data/constants';

export default function AddTransactionModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({ type: 'Expense', date: new Date().toISOString().split('T')[0], amount: '', category: 'Groceries', desc: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const [year, monthStr, day] = formData.date.split('-');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[parseInt(monthStr, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

    onAdd({
      id: Date.now(), date: formattedDate, desc: formData.desc, category: formData.category,
      type: formData.type.toLowerCase(), amount: parseFloat(formData.amount) || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border dark:border-slate-700 animate-scale-in">
        <div className="flex justify-between items-center p-5 border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-white">Add New Transaction</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors hover:rotate-90 duration-200"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Type</label>
              <select required className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer"
                value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>Expense</option>
                <option>Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Date</label>
              <input type="date" required className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer"
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Amount (₹)</label>
            <input type="number" required min="0.01" step="0.01" placeholder="0.00"
              className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500"
              value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Category</label>
            <select required className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                {CATEGORIES.filter(c => c !== 'All Categories').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Description</label>
            <input type="text" required placeholder="e.g., Weekly groceries"
              className="w-full border dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500"
              value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-all duration-200 active:scale-95">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}