import React, { useState } from 'react';
import ProductList from './components/ProductList';
import StockDashboard from './components/StockDashboard';

function App() {
  const [activePage, setActivePage] = useState('catalogo');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 text-3xl font-bold text-center shadow-lg">
        Galene
      </header>
      <nav className="bg-white shadow-md p-4 flex justify-center space-x-6">
        <button
          onClick={() => setActivePage('catalogo')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activePage === 'catalogo'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          Catálogo
        </button>
        <button
          onClick={() => setActivePage('admin')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activePage === 'admin'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          Admin
        </button>
      </nav>
      <main className="p-8">
        {activePage === 'catalogo' ? <ProductList /> : <StockDashboard />}
      </main>
    </div>
  );
}

export default App;
