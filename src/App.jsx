// import React, { useState, useEffect } from 'react';
// import { ChevronDown, PlusCircle, Filter, Search, Edit2, Trash2, LogIn, UserPlus, LogOut, PieChart as PieChartIcon, DollarSign, TrendingUp, TrendingDown, CalendarDays, Tag, FileText, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';

// // Mock data (replace with API calls and Redux state)
// const initialTransactions = [
//   { id: 1, title: 'Salary', amount: 5000, type: 'Income', date: '2024-05-01', category: 'Salary', notes: 'Monthly salary' },
//   { id: 2, title: 'Groceries', amount: 150, type: 'Expense', date: '2024-05-03', category: 'Food', notes: 'Weekly groceries' },
//   { id: 3, title: 'Rent', amount: 1200, type: 'Expense', date: '2024-05-05', category: 'Bills', notes: 'Monthly rent' },
//   { id: 4, title: 'Freelance Project', amount: 800, type: 'Income', date: '2024-05-10', category: 'Freelance', notes: '' },
//   { id: 5, title: 'Dinner Out', amount: 75, type: 'Expense', date: '2024-05-12', category: 'Food', notes: 'Restaurant' },
//   { id: 6, title: 'Internet Bill', amount: 60, type: 'Expense', date: '2024-05-15', category: 'Bills', notes: '' },
//   { id: 7, title: 'New Gadget', amount: 300, type: 'Expense', date: '2024-05-20', category: 'Shopping', notes: 'Headphones' },
//   { id: 8, title: 'Stock Dividend', amount: 120, type: 'Income', date: '2024-05-22', category: 'Investment', notes: '' },
//   { id: 9, title: 'Movie Tickets', amount: 30, type: 'Expense', date: '2024-05-25', category: 'Entertainment', notes: '' },
//   { id: 10, title: 'Gym Membership', amount: 50, type: 'Expense', date: '2024-05-28', category: 'Health', notes: '' },
//   { id: 11, title: 'Book Purchase', amount: 25, type: 'Expense', date: '2024-05-30', category: 'Education', notes: 'React learning book' },
// ];

// const CATEGORIES = ['Salary', 'Food', 'Bills', 'Freelance', 'Shopping', 'Investment', 'Entertainment', 'Health', 'Education', 'Travel', 'Other'];
// const ITEMS_PER_PAGE = 10;

// // Helper to format currency
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
// };

// // Main App Component
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Mock authentication
//   const [showLogin, setShowLogin] = useState(true); // Show login by default
//   const [showRegister, setShowRegister] = useState(false);

//   const [transactions, setTransactions] = useState(initialTransactions);
//   const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions);

//   const [showTransactionModal, setShowTransactionModal] = useState(false);
//   const [editingTransaction, setEditingTransaction] = useState(null);

//   // Filters
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('All'); // All, Income, Expense
//   const [filterCategory, setFilterCategory] = useState('All');
//   const [filterStartDate, setFilterStartDate] = useState('');
//   const [filterEndDate, setFilterEndDate] = useState('');

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);

//   // Derived state for dashboard
//   const totalIncome = filteredTransactions
//     .filter(t => t.type === 'Income')
//     .reduce((sum, t) => sum + t.amount, 0);
//   const totalExpense = filteredTransactions
//     .filter(t => t.type === 'Expense')
//     .reduce((sum, t) => sum + t.amount, 0);
//   const balance = totalIncome - totalExpense;

//   // Effect for filtering and searching
//   useEffect(() => {
//     let tempTransactions = transactions;

//     if (searchTerm) {
//       tempTransactions = tempTransactions.filter(t =>
//         t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         t.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filterType !== 'All') {
//       tempTransactions = tempTransactions.filter(t => t.type === filterType);
//     }

//     if (filterCategory !== 'All') {
//       tempTransactions = tempTransactions.filter(t => t.category === filterCategory);
//     }

//     if (filterStartDate) {
//       tempTransactions = tempTransactions.filter(t => new Date(t.date) >= new Date(filterStartDate));
//     }
//     if (filterEndDate) {
//       // Add 1 day to include the end date itself
//       const endDatePlusOne = new Date(filterEndDate);
//       endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);
//       tempTransactions = tempTransactions.filter(t => new Date(t.date) < endDatePlusOne);
//     }

//     setFilteredTransactions(tempTransactions);
//     setCurrentPage(1); // Reset to first page on filter change
//   }, [transactions, searchTerm, filterType, filterCategory, filterStartDate, filterEndDate]);

//   // Pagination logic
//   const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
//   const paginatedTransactions = filteredTransactions.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handleAddTransaction = (transaction) => {
//     setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]); // Simple ID generation
//     setShowTransactionModal(false);
//   };

//   const handleEditTransaction = (updatedTransaction) => {
//     setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
//     setShowTransactionModal(false);
//     setEditingTransaction(null);
//   };

//   const handleDeleteTransaction = (id) => {
//     // Simple confirm, replace with a modal dialog
//     if (window.confirm('Are you sure you want to delete this transaction?')) {
//         setTransactions(prev => prev.filter(t => t.id !== id));
//     }
//   };

//   const openEditModal = (transaction) => {
//     setEditingTransaction(transaction);
//     setShowTransactionModal(true);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Mock login logic
//     setIsAuthenticated(true);
//     setShowLogin(false);
//     setShowRegister(false);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Mock register logic
//     setIsAuthenticated(true); // Auto-login after register for simplicity
//     setShowLogin(false);
//     setShowRegister(false);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setShowLogin(true);
//   };


//   if (!isAuthenticated) {
//     if (showLogin) {
//       return <AuthForm type="Login" onSubmit={handleLogin} onSwitch={() => {setShowLogin(false); setShowRegister(true);}} />;
//     }
//     if (showRegister) {
//       return <AuthForm type="Register" onSubmit={handleRegister} onSwitch={() => {setShowLogin(true); setShowRegister(false);}}/>;
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 font-sans">
//       <Header onLogout={handleLogout} />

//       <main className="p-4 md:p-8 max-w-7xl mx-auto">
//         <DashboardSummary income={totalIncome} expense={totalExpense} balance={balance} />

//         <div className="mt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//             <h2 className="text-3xl font-semibold text-sky-400">Transactions</h2>
//             <button
//               onClick={() => { setEditingTransaction(null); setShowTransactionModal(true); }}
//               className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
//             >
//               <PlusCircle size={20} className="mr-2" /> Add Transaction
//             </button>
//           </div>

//           <TransactionFilters
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             filterType={filterType}
//             setFilterType={setFilterType}
//             filterCategory={filterCategory}
//             setFilterCategory={setFilterCategory}
//             filterStartDate={filterStartDate}
//             setFilterStartDate={setFilterStartDate}
//             filterEndDate={filterEndDate}
//             setFilterEndDate={setFilterEndDate}
//             categories={CATEGORIES}
//           />

//           <TransactionList 
//             transactions={paginatedTransactions} 
//             onEdit={openEditModal} 
//             onDelete={handleDeleteTransaction} 
//           />

//           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//         </div>

//         {/* Bonus: Pie Chart Placeholder */}
//         <div className="mt-12 p-6 bg-slate-800 rounded-xl shadow-2xl">
//           <h3 className="text-2xl font-semibold text-sky-400 mb-4">Income vs Expense</h3>
//           <div className="h-64 md:h-80 flex items-center justify-center text-gray-400">
//             {/* Replace with actual Recharts PieChart component */}
//             <PieChartIcon size={64} className="opacity-50" />
//             <p className="ml-4">Pie chart will be displayed here (e.g., using Recharts)</p>
//           </div>
//         </div>

//       </main>

//       {showTransactionModal && (
//         <TransactionModal
//           isOpen={showTransactionModal}
//           onClose={() => { setShowTransactionModal(false); setEditingTransaction(null); }}
//           onSave={editingTransaction ? handleEditTransaction : handleAddTransaction}
//           transaction={editingTransaction}
//           categories={CATEGORIES}
//         />
//       )}
//        <Footer />
//     </div>
//   );
// }

// // Authentication Form Component
// function AuthForm({ type, onSubmit, onSwitch }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState(''); // For registration

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col justify-center items-center p-4">
//       <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-2xl">
//         <div className="text-center mb-8">
//           <DollarSign size={48} className="mx-auto text-sky-500" />
//           <h1 className="text-3xl font-bold text-sky-400 mt-2">Personal Finance Tracker</h1>
//           <p className="text-gray-400">{type === 'Login' ? 'Welcome back!' : 'Create your account'}</p>
//         </div>
//         <form onSubmit={onSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete={type === 'Login' ? "current-password" : "new-password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//               placeholder="••••••••"
//             />
//           </div>
//           {type === 'Register' && (
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//                 placeholder="••••••••"
//               />
//             </div>
//           )}
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition duration-150"
//             >
//               {type}
//             </button>
//           </div>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-400">
//           {type === 'Login' ? "Don't have an account?" : "Already have an account?"}
//           <button onClick={onSwitch} className="ml-1 font-medium text-sky-500 hover:text-sky-400">
//             {type === 'Login' ? 'Register here' : 'Login here'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


// // Header Component
// function Header({ onLogout }) {
//   return (
//     <header className="bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <DollarSign size={32} className="text-sky-500" />
//             <h1 className="ml-3 text-2xl font-bold text-sky-400">Finance Tracker</h1>
//           </div>
//           <div className="flex items-center space-x-3">
//             {/* Mock user info - replace with actual user data from Redux/Auth context */}
//             <span className="text-sm text-gray-300 hidden sm:block">Welcome, User!</span>
//             <button 
//               onClick={onLogout}
//               className="flex items-center text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg shadow transition duration-150"
//             >
//               <LogOut size={16} className="mr-1.5" /> Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// // Dashboard Summary Component
// function DashboardSummary({ income, expense, balance }) {
//   const summaryItems = [
//     { title: 'Total Income', value: income, icon: TrendingUp, color: 'text-green-400', bgColor: 'bg-green-500/10' },
//     { title: 'Total Expense', value: expense, icon: TrendingDown, color: 'text-red-400', bgColor: 'bg-red-500/10' },
//     { title: 'Balance', value: balance, icon: DollarSign, color: balance >= 0 ? 'text-sky-400' : 'text-orange-400', bgColor: 'bg-sky-500/10' },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
//       {summaryItems.map(item => (
//         <div key={item.title} className={`p-6 rounded-xl shadow-xl ${item.bgColor} border border-slate-700 hover:shadow-sky-500/30 transition-shadow duration-300`}>
//           <div className="flex items-center justify-between">
//             <p className={`text-sm font-medium ${item.color} uppercase tracking-wider`}>{item.title}</p>
//             <item.icon size={28} className={`${item.color} opacity-70`} />
//           </div>
//           <p className={`mt-1 text-3xl font-semibold ${item.color}`}>{formatCurrency(item.value)}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Transaction Filters Component
// function TransactionFilters({ 
//   searchTerm, setSearchTerm, 
//   filterType, setFilterType, 
//   filterCategory, setFilterCategory, 
//   filterStartDate, setFilterStartDate,
//   filterEndDate, setFilterEndDate,
//   categories 
// }) {
//   return (
//     <div className="mb-6 p-4 md:p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
//         {/* Search Input */}
//         <div className="xl:col-span-2">
//           <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">Search Title/Category</label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               id="search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search transactions..."
//               className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//             />
//           </div>
//         </div>

//         {/* Filter by Type */}
//         <div>
//           <label htmlFor="filterType" className="block text-sm font-medium text-gray-300 mb-1">Type</label>
//           <select
//             id="filterType"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//             className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//           >
//             <option value="All">All Types</option>
//             <option value="Income">Income</option>
//             <option value="Expense">Expense</option>
//           </select>
//         </div>

//         {/* Filter by Category */}
//         <div>
//           <label htmlFor="filterCategory" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
//           <select
//             id="filterCategory"
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//             className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//           >
//             <option value="All">All Categories</option>
//             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//           </select>
//         </div>

//         {/* Date Range Filter */}
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label htmlFor="filterStartDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
//             <input
//               type="date"
//               id="filterStartDate"
//               value={filterStartDate}
//               onChange={(e) => setFilterStartDate(e.target.value)}
//               className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//             />
//           </div>
//           <div>
//             <label htmlFor="filterEndDate" className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
//             <input
//               type="date"
//               id="filterEndDate"
//               value={filterEndDate}
//               onChange={(e) => setFilterEndDate(e.target.value)}
//               className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// // Transaction List Component
// function TransactionList({ transactions, onEdit, onDelete }) {
//   if (transactions.length === 0) {
//     return <p className="text-center text-gray-400 py-8 text-lg">No transactions found. Try adjusting your filters or add a new transaction!</p>;
//   }

//   return (
//     <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
//       <div className="overflow-x-auto">
//         <table className="w-full min-w-max text-sm text-left text-gray-300">
//           <thead className="text-xs text-sky-400 uppercase bg-slate-700/50">
//             <tr>
//               <th scope="col" className="px-6 py-3">Title</th>
//               <th scope="col" className="px-6 py-3">Amount</th>
//               <th scope="col" className="px-6 py-3 hidden md:table-cell">Type</th>
//               <th scope="col" className="px-6 py-3 hidden lg:table-cell">Date</th>
//               <th scope="col" className="px-6 py-3 hidden md:table-cell">Category</th>
//               <th scope="col" className="px-6 py-3 hidden xl:table-cell">Notes</th>
//               <th scope="col" className="px-6 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction) => (
//               <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit} onDelete={onDelete} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // Transaction Item Component
// function TransactionItem({ transaction, onEdit, onDelete }) {
//   const { id, title, amount, type, date, category, notes } = transaction;
//   const amountColor = type === 'Income' ? 'text-green-400' : 'text-red-400';

//   return (
//     <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/70 transition-colors duration-150">
//       <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">{title}</td>
//       <td className={`px-6 py-4 font-semibold ${amountColor}`}>{formatCurrency(type === 'Income' ? amount : -amount)}</td>
//       <td className="px-6 py-4 hidden md:table-cell">
//         <span className={`px-2 py-1 text-xs font-medium rounded-full ${type === 'Income' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
//           {type}
//         </span>
//       </td>
//       <td className="px-6 py-4 hidden lg:table-cell text-gray-400">{new Date(date).toLocaleDateString()}</td>
//       <td className="px-6 py-4 hidden md:table-cell text-gray-400">{category}</td>
//       <td className="px-6 py-4 hidden xl:table-cell text-gray-400 truncate max-w-xs">{notes || '-'}</td>
//       <td className="px-6 py-4 text-center">
//         <div className="flex items-center justify-center space-x-2">
//           <button onClick={() => onEdit(transaction)} className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-md transition">
//             <Edit2 size={18} />
//           </button>
//           <button onClick={() => onDelete(id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-md transition">
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// }

// // Pagination Component
// function Pagination({ currentPage, totalPages, onPageChange }) {
//   if (totalPages <= 1) return null;

//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="flex items-center justify-center mt-8" aria-label="Pagination">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-slate-600 bg-slate-700 text-sm font-medium text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
//       >
//         <ChevronLeft size={18} /> <span className="ml-1 hidden sm:inline">Previous</span>
//       </button>

//       {/* Page numbers - simplified for brevity, can be expanded with ellipsis for many pages */}
//       {pageNumbers.map(number => (
//         <button
//           key={number}
//           onClick={() => onPageChange(number)}
//           className={`relative inline-flex items-center px-4 py-2 border-y border-slate-600 ${currentPage === number ? 'bg-sky-600 text-white z-10' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'} text-sm font-medium transition`}
//         >
//           {number}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-slate-600 bg-slate-700 text-sm font-medium text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
//       >
//         <span className="mr-1 hidden sm:inline">Next</span> <ChevronRight size={18} />
//       </button>
//     </nav>
//   );
// }


// // Transaction Modal (Add/Edit Form)
// function TransactionModal({ isOpen, onClose, onSave, transaction, categories }) {
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');
//   const [type, setType] = useState('Expense');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
//   const [category, setCategory] = useState(categories[0] || '');
//   const [notes, setNotes] = useState('');

//   useEffect(() => {
//     if (transaction) {
//       setTitle(transaction.title);
//       setAmount(transaction.amount.toString());
//       setType(transaction.type);
//       setDate(transaction.date);
//       setCategory(transaction.category);
//       setNotes(transaction.notes || '');
//     } else {
//       // Reset form for new transaction
//       setTitle('');
//       setAmount('');
//       setType('Expense');
//       setDate(new Date().toISOString().split('T')[0]);
//       setCategory(categories[0] || '');
//       setNotes('');
//     }
//   }, [transaction, isOpen, categories]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !amount || !date || !category) {
//         alert("Please fill in all required fields: Title, Amount, Date, and Category."); // Replace with better modal alert
//         return;
//     }
//     onSave({
//       id: transaction ? transaction.id : null, // Keep id if editing
//       title,
//       amount: parseFloat(amount),
//       type,
//       date,
//       category,
//       notes,
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
//       <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto">
//         <h3 className="text-2xl font-semibold text-sky-400 mb-6">{transaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
//             <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
//               <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
//             </div>
//             <div>
//               <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Type</label>
//               <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
//                 <option value="Income">Income</option>
//                 <option value="Expense">Expense</option>
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
//               <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
//             </div>
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
//               <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
//                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//               </select>
//             </div>
//           </div>
//           <div>
//             <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes (Optional)</label>
//             <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
//           </div>
//           <div className="flex justify-end space-x-3 pt-2">
//             <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 text-gray-200 font-medium rounded-lg transition">Cancel</button>
//             <button type="submit" className="py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition">Save Transaction</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer className="py-8 text-center text-gray-500 border-t border-slate-700/50 mt-12">
//       <p>&copy; {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
//       <p className="text-xs mt-1">Designed with React & TailwindCSS</p>
//     </footer>
//   );
// }


// export default App;

import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, PlusCircle, Filter, Search, Edit2, Trash2, LogIn, UserPlus, LogOut, PieChart as PieChartIcon, DollarSign, TrendingUp, TrendingDown, CalendarDays, Tag, FileText, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Redux actions
import { register, login, logout, clearAuthError } from './redux/slices/authSlice';
import { fetchTransactions, addTransaction, updateTransaction, deleteTransaction, clearTransactions } from './redux/slices/transactionSlice';

// Your existing CATEGORIES and formatCurrency helper
const CATEGORIES = ['Salary', 'Food', 'Bills', 'Freelance', 'Shopping', 'Investment', 'Entertainment', 'Health', 'Education', 'Travel', 'Other'];
const ITEMS_PER_PAGE = 10; // This will now be handled by the backend's limit/page

// Define COLORS outside the component so it doesn't re-render unnecessarily
const COLORS = ['#82ca9d', '#ff8484', '#00C49F', '#FFBB28', '#FF8042']; // Added more colors for potential future use

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Main App Component
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading: authLoading, error: authError } = useSelector((state) => state.auth);
  // Destructure totalIncome and totalExpense directly from Redux state
  const { items: transactions, totalIncome, totalExpense, balance, isLoading: transactionsLoading, error: transactionError, totalPages, currentPage } = useSelector((state) => state.transactions);

  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Filters (now also managed by state and passed to fetchTransactions)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [page, setPage] = useState(1); // Local page state, controlled by Pagination component

  // Effect to fetch transactions when filters or auth changes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTransactions({
        search: searchTerm,
        type: filterType,
        category: filterCategory,
        startDate: filterStartDate,
        endDate: filterEndDate,
        page,
        limit: ITEMS_PER_PAGE,
      }));
    } else {
      dispatch(clearTransactions()); // Clear transactions if not authenticated
    }
  }, [isAuthenticated, searchTerm, filterType, filterCategory, filterStartDate, filterEndDate, page, dispatch]);


  const handleAddOrEditTransaction = async (transactionData) => {
    if (editingTransaction) {
      // Pass the backend ID for update
      await dispatch(updateTransaction({ ...transactionData, id: editingTransaction._id }));
    } else {
      await dispatch(addTransaction(transactionData));
    }
    setShowTransactionModal(false);
    setEditingTransaction(null);
    // Re-fetch transactions to reflect changes from backend
    dispatch(fetchTransactions({
      search: searchTerm,
      type: filterType,
      category: filterCategory,
      startDate: filterStartDate,
      endDate: filterEndDate,
      page,
      limit: ITEMS_PER_PAGE,
    }));
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await dispatch(deleteTransaction(id));
      // Re-fetch transactions to reflect changes from backend
      dispatch(fetchTransactions({
        search: searchTerm,
        type: filterType,
        category: filterCategory,
        startDate: filterStartDate,
        endDate: filterEndDate,
        page,
        limit: ITEMS_PER_PAGE,
      }));
    }
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleUserLogin = (email, password) => {
    dispatch(login({ email, password }));
  };

  const handleUserRegister = (email, password) => {
    dispatch(register({ email, password }));
  };

  const handleUserLogout = () => {
    dispatch(logout());
  };

  // --- PIE CHART DATA CALCULATION ---
  const pieChartData = useMemo(() => {
    // Ensure values are numbers for calculations
    const incomeValue = parseFloat(totalIncome) || 0;
    const expenseValue = parseFloat(totalExpense) || 0;

    return [
      { name: 'Income', value: incomeValue },
      { name: 'Expense', value: expenseValue },
    ];
  }, [totalIncome, totalExpense]); // Recalculate only when totalIncome or totalExpense changes
  // --- END PIE CHART DATA CALCULATION ---

  if (!isAuthenticated) {
    if (showLogin) {
      return <AuthForm type="Login" onSubmit={handleUserLogin} onSwitch={() => { setShowLogin(false); setShowRegister(true); }} isLoading={authLoading} error={authError} />;
    }
    if (showRegister) {
      return <AuthForm type="Register" onSubmit={handleUserRegister} onSwitch={() => { setShowLogin(true); setShowRegister(false); }} isLoading={authLoading} error={authError} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 font-sans">
      <Header onLogout={handleUserLogout} userName={user?.email} />

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <DashboardSummary income={totalIncome} expense={totalExpense} balance={balance} />

        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-semibold text-sky-400">Transactions</h2>
            <button
              onClick={() => { setEditingTransaction(null); setShowTransactionModal(true); }}
              className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
            >
              <PlusCircle size={20} className="mr-2" /> Add Transaction
            </button>
          </div>

          <TransactionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterStartDate={filterStartDate}
            setFilterStartDate={setFilterStartDate}
            filterEndDate={filterEndDate}
            setFilterEndDate={setFilterEndDate}
            categories={CATEGORIES}
          />

          {transactionsLoading ? (
            <p className="text-center text-gray-400 py-8 text-lg">Loading transactions...</p>
          ) : transactionError ? (
            <p className="text-center text-red-400 py-8 text-lg">Error: {transactionError}</p>
          ) : (
            <TransactionList
              transactions={transactions}
              onEdit={openEditModal}
              onDelete={handleDeleteTransaction}
            />
          )}


          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>

        {/* Bonus: Pie Chart */}
        <div className="mt-12 p-6 bg-slate-800 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-semibold text-sky-400 mb-4">Income vs Expense Distribution</h3>
          {/* Only render chart if there's any income or expense */}
          {totalIncome === 0 && totalExpense === 0 ? (
            <div className="h-64 md:h-80 flex items-center justify-center text-gray-400">
              <PieChartIcon size={64} className="opacity-50" />
              <p className="ml-4">Add transactions to see your spending habits!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  // Removed fill="#8884d8" from here as it's now handled by Cells
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    // Assign colors dynamically based on the COLORS array
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                {/* Tooltip to show formatted values */}
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </main>

      {showTransactionModal && (
        <TransactionModal
          isOpen={showTransactionModal}
          onClose={() => { setShowTransactionModal(false); setEditingTransaction(null); }}
          onSave={handleAddOrEditTransaction}
          transaction={editingTransaction}
          categories={CATEGORIES}
        />
      )}
      <Footer />
    </div>
  );
}

// Authentication Form Component
function AuthForm({ type, onSubmit, onSwitch, isLoading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For registration
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'Register' && password !== confirmPassword) {
      alert("Passwords do not match!"); // Replace with a better UI alert
      return;
    }
    onSubmit(email, password);
  };

  useEffect(() => {
    // Clear error when switching form type
    dispatch(clearAuthError());
  }, [type, dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <DollarSign size={48} className="mx-auto text-sky-500" />
          <h1 className="text-3xl font-bold text-sky-400 mt-2">Personal Finance Tracker</h1>
          <p className="text-gray-400">{type === 'Login' ? 'Welcome back!' : 'Create your account'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={type === 'Login' ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {type === 'Register' && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          )}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : type}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          {type === 'Login' ? "Don't have an account?" : "Already have an account?"}
          <button onClick={onSwitch} className="ml-1 font-medium text-sky-500 hover:text-sky-400">
            {type === 'Login' ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
}


// Header Component
function Header({ onLogout, userName }) {
  return (
    <header className="bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <DollarSign size={32} className="text-sky-500" />
            <h1 className="ml-3 text-2xl font-bold text-sky-400">Finance Tracker</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-300 hidden sm:block">Welcome, {userName || 'User'}!</span>
            <button
              onClick={onLogout}
              className="flex items-center text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg shadow transition duration-150"
            >
              <LogOut size={16} className="mr-1.5" /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Dashboard Summary Component (remains mostly same, just uses Redux state)
function DashboardSummary({ income, expense, balance }) {
  const summaryItems = [
    { title: 'Total Income', value: income, icon: TrendingUp, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    { title: 'Total Expense', value: expense, icon: TrendingDown, color: 'text-red-400', bgColor: 'bg-red-500/10' },
    { title: 'Balance', value: balance, icon: DollarSign, color: balance >= 0 ? 'text-sky-400' : 'text-orange-400', bgColor: 'bg-sky-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {summaryItems.map(item => (
        <div key={item.title} className={`p-6 rounded-xl shadow-xl ${item.bgColor} border border-slate-700 hover:shadow-sky-500/30 transition-shadow duration-300`}>
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${item.color} uppercase tracking-wider`}>{item.title}</p>
            <item.icon size={28} className={`${item.color} opacity-70`} />
          </div>
          <p className={`mt-1 text-3xl font-semibold ${item.color}`}>{formatCurrency(item.value)}</p>
        </div>
      ))}
    </div>
  );
}

// Transaction Filters Component (remains mostly same, input values bound to state)
function TransactionFilters({
  searchTerm, setSearchTerm,
  filterType, setFilterType,
  filterCategory, setFilterCategory,
  filterStartDate, setFilterStartDate,
  filterEndDate, setFilterEndDate,
  categories
}) {
  return (
    <div className="mb-6 p-4 md:p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        {/* Search Input */}
        <div className="xl:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">Search Title/Category</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
          </div>
        </div>

        {/* Filter by Type */}
        <div>
          <label htmlFor="filterType" className="block text-sm font-medium text-gray-300 mb-1">Type</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Filter by Category */}
        <div>
          <label htmlFor="filterCategory" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
          <select
            id="filterCategory"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="filterStartDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              id="filterStartDate"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
          </div>
          <div>
            <label htmlFor="filterEndDate" className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              id="filterEndDate"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="w-full py-2 px-3 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
          </div>
        </div>

      </div>
    </div>
  );
}


// Transaction List Component (receives transactions from Redux)
function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-400 py-8 text-lg">No transactions found. Try adjusting your filters or add a new transaction!</p>;
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm text-left text-gray-300">
          <thead className="text-xs text-sky-400 uppercase bg-slate-700/50">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Type</th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">Date</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Category</th>
              <th scope="col" className="px-6 py-3 hidden xl:table-cell">Notes</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              // Use transaction._id from MongoDB instead of id
              <TransactionItem key={transaction._id} transaction={transaction} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Transaction Item Component (uses _id)
function TransactionItem({ transaction, onEdit, onDelete }) {
  // Use _id from MongoDB
  const { _id, title, amount, type, date, category, notes } = transaction;
  const amountColor = type === 'Income' ? 'text-green-400' : 'text-red-400';

  return (
    <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/70 transition-colors duration-150">
      <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">{title}</td>
      <td className={`px-6 py-4 font-semibold ${amountColor}`}>{formatCurrency(type === 'Income' ? amount : -amount)}</td>
      <td className="px-6 py-4 hidden md:table-cell">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${type === 'Income' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          {type}
        </span>
      </td>
      {/* Ensure date is correctly formatted for display */}
      <td className="px-6 py-4 hidden lg:table-cell text-gray-400">{new Date(date).toLocaleDateString()}</td>
      <td className="px-6 py-4 hidden md:table-cell text-gray-400">{category}</td>
      <td className="px-6 py-4 hidden xl:table-cell text-gray-400 truncate max-w-xs">{notes || '-'}</td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button onClick={() => onEdit(transaction)} className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-md transition">
            <Edit2 size={18} />
          </button>
          <button onClick={() => onDelete(_id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-md transition">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Pagination Component (remains mostly same, just uses Redux state for totalPages/currentPage)
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  // Show a limited range of page numbers around the current page for better UX
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  if (startPage === 1 && endPage < totalPages) {
    endPage = Math.min(totalPages, maxPagesToShow);
  }


  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-slate-600 bg-slate-700 text-sm font-medium text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={18} /> <span className="ml-1 hidden sm:inline">Previous</span>
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`relative inline-flex items-center px-4 py-2 border-y border-slate-600 bg-slate-700 text-gray-300 hover:bg-slate-600 text-sm font-medium transition`}
          >
            1
          </button>
          {startPage > 2 && (
            <span className="relative inline-flex items-center px-4 py-2 border-y border-slate-600 bg-slate-700 text-gray-400 text-sm font-medium">...</span>
          )}
        </>
      )}

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`relative inline-flex items-center px-4 py-2 border-y border-slate-600 ${currentPage === number ? 'bg-sky-600 text-white z-10' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'} text-sm font-medium transition`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="relative inline-flex items-center px-4 py-2 border-y border-slate-600 bg-slate-700 text-gray-400 text-sm font-medium">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`relative inline-flex items-center px-4 py-2 border-y border-slate-600 bg-slate-700 text-gray-300 hover:bg-slate-600 text-sm font-medium transition`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-slate-600 bg-slate-700 text-sm font-medium text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <span className="mr-1 hidden sm:inline">Next</span> <ChevronRight size={18} />
      </button>
    </nav>
  );
}


// Transaction Modal (Add/Edit Form) - no major changes needed, just ensure `id` from backend is `_id`
function TransactionModal({ isOpen, onClose, onSave, transaction, categories }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
  const [category, setCategory] = useState(categories[0] || '');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(transaction.amount.toString());
      setType(transaction.type);
      setDate(new Date(transaction.date).toISOString().split('T')[0]); // Format date from backend
      setCategory(transaction.category);
      setNotes(transaction.notes || '');
    } else {
      // Reset form for new transaction
      setTitle('');
      setAmount('');
      setType('Expense');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory(categories[0] || '');
      setNotes('');
    }
  }, [transaction, isOpen, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date || !category) {
      alert("Please fill in all required fields: Title, Amount, Date, and Category.");
      return;
    }
    onSave({
      id: transaction ? transaction._id : null, // Use _id from backend
      title,
      amount: parseFloat(amount),
      type,
      date,
      category,
      notes,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-sky-400 mb-6">{transaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
              <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Type</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes (Optional)</label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-slate-600 hover:bg-slate-500 text-gray-200 font-medium rounded-lg transition">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Footer Component (remains the same)
function Footer() {
  return (
    <footer className="py-8 text-center text-gray-500 border-t border-slate-700/50 mt-12">
      <p>&copy; {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
      <p className="text-xs mt-1">Designed with React & TailwindCSS</p>
    </footer>
  );
}

export default App;