import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [activePage, setActivePage] = useState('catalogo');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Galene</h1>
          <nav className="flex space-x-4">
            <button
              onClick={() => setActivePage('catalogo')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activePage === 'catalogo'
                  ? 'bg-blue-700 shadow-md'
                  : 'bg-transparent hover:bg-blue-500'
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => setActivePage('admin')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activePage === 'admin'
                  ? 'bg-blue-700 shadow-md'
                  : 'bg-transparent hover:bg-blue-500'
              }`}
            >
              Admin
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-8">
        {activePage === 'catalogo' ? <ProductList /> : <AdminDashboard />}
      </main>
    </div>
  );
}

export default App;
