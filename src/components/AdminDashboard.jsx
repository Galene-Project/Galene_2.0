import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminProducts from './AdminProducts';
import AdminReports from './AdminReports';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const [{ count: users }, { count: products }, { count: orders }, { data: orderData }] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total')
      ]);

      const revenue = orderData?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

      setSummary({ users: users || 0, products: products || 0, orders: orders || 0, revenue });
    } catch (error) {
      console.error('Erro ao buscar resumo:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Usuários</h3>
          <p className="text-3xl font-bold text-indigo-600">{summary.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Produtos</h3>
          <p className="text-3xl font-bold text-green-600">{summary.products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Pedidos</h3>
          <p className="text-3xl font-bold text-blue-600">{summary.orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Receita Total</h3>
          <p className="text-3xl font-bold text-purple-600">R$ {summary.revenue.toLocaleString('pt-BR')}</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`${
              activeTab === 'products'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Produtos
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`${
              activeTab === 'reports'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Relatórios
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'reports' && <AdminReports />}
      </div>
    </div>
  );
};

export default AdminDashboard;
