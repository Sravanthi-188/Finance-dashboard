# Finance Dashboard

A modern, interactive financial dashboard built as a frontend interface for tracking and understanding financial activity. Designed with clean architecture, responsive UI, and persistent state management.

## 🚀 Live Demo
[View Live Dashboard](https://finance-dashboard-lemon-mu.vercel.app/)

## ✨ Key Features

* **Dashboard Overview:** Visualizes total balance, income, and expenses with dynamic charts using Recharts.
* **Transactions Management:** View, search, filter, sort, and add new transactions. Includes functionality to delete records.
* **Data Insights:** Analyzes spending patterns, highlights top expenses, and provides smart financial observations.
* **Role-Based UI:** Toggles between 'Admin' (full CRUD access) and 'Viewer' (read-only/export access) modes to demonstrate basic RBAC behavior.
* **Dark/Light Mode:** System-integrated theme toggle with smooth transitions.
* **Data Persistence:** Automatically saves and retrieves transaction data and theme preferences using browser `localStorage`.
* **Export Functionality:** Download current transaction history as a CSV file.

## 🏗️ Architecture & Approach

To ensure maintainability, scalability, and technical quality, the application is structured into modular components rather than a single monolithic file:

* **Component Modularity:** UI is divided into feature-specific folders (`Dashboard`, `Transactions`, `Insights`, `Layout`, `Shared`).
* **State Management:** Utilizes standard React Hooks (`useState`, `useEffect`) combined with `localStorage`. `useMemo` is heavily used to optimize performance by preventing unnecessary recalculations during filtering, sorting, and chart rendering.
* **Styling:** Tailwind CSS is used for utility-first, fully responsive design ensuring adaptability across all screen sizes.
* **Animation:** Custom Tailwind keyframes are utilized to provide smooth, intuitive feedback (e.g., fade-ins, hover states) without heavy external animation libraries.

## 🛠️ Tech Stack

* **Framework:** React (Bootstrapped with Vite)
* **Styling:** Tailwind CSS
* **Data Visualization:** Recharts
* **Icons:** Lucide React

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Sravanthi-188/Finance-dashboard.git](https://github.com/Sravanthi-188/Finance-dashboard.git)
