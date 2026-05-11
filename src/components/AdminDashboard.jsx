import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminProducts from './AdminProducts';
import AdminReports from './AdminReports';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalValue: 0,
    lowStock: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    const totalProducts = data?.length || 0;
    const totalStock = data?.reduce((sum, p) => sum + (p.stock || 0), 0) || 0;
    const totalValue = data?.reduce((sum, p) => sum + ((p.stock || 0) * (p.price || 0)), 0) || 0;
    const lowStock = data?.filter(p => (p.stock || 0) < 10).length || 0;
    setStats({ totalProducts, totalStock, totalValue, lowStock });
    setLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total de Produtos</h3>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalProducts.toLocaleString()}</p>
              <button
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                onClick={() => setActiveTab('produtos')}
              >
                Ver todos
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Estoque Total</h3>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalStock.toLocaleString()}</p>
              <button
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                onClick={() => setActiveTab('produtos')}
              >
                Ver detalhes
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Valor Total</h3>
              <p className="mt-1 text-3xl font-semibold text-gray-900">R$ {stats.totalValue.toLocaleString('pt-BR')}</p>
              <button
                className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                onClick={() => setActiveTab('relatorios')}
              >
                Ver relatórios
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Produtos com Estoque Baixo</h3>
              <p className="mt-1 text-3xl font-semibold text-red-600">{stats.lowStock}</p>
              <button
                className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                onClick={() => setActiveTab('produtos')}
              >
                Gerenciar
              </button>
            </div>
          </div>
        );
      case 'produtos':
        return <AdminProducts />;
      case 'relatorios':
        return <AdminReports />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel do Administrador</h1>
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`-mb-px p-4 font-medium ${activeTab === 'dashboard' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`-mb-px p-4 font-medium ${activeTab === 'produtos' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('produtos')}
          >
            Produtos
          </button>
          <button
            className={`-mb-px p-4 font-medium ${activeTab === 'relatorios' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('relatorios')}
          >
            Relatórios
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
