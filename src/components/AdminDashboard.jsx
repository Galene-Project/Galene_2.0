import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminProducts from './AdminProducts';
import AdminReports from './AdminReports';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, sku, name, category, material, price, price_original, discount_percentage, is_active');

    if (error) {
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.is_active).length;
  const simulatedStockPerProduct = 10;
  const totalStock = totalProducts * simulatedStockPerProduct;
  const totalValue = products.reduce((sum, p) => sum + (p.price * simulatedStockPerProduct), 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('produtos')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'produtos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => setActiveTab('relatorios')}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'relatorios'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Relatórios
            </button>
          </nav>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total de Produtos</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalProducts}</dd>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Estoque Total</dt>
                  <dd className="mt-1 text-3xl font-semibold text-green-600">{totalStock}</dd>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Valor Total</dt>
                  <dd className="mt-1 text-3xl font-semibold text-indigo-600">
                    R$ {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </dd>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                <div className="p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Produtos Ativos</dt>
                  <dd className="mt-1 text-3xl font-semibold text-blue-600">{activeProducts}</dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'produtos' && <AdminProducts products={products} />}

        {activeTab === 'relatorios' && <AdminReports />}
      </div>
    </div>
  );
};

export default AdminDashboard;
