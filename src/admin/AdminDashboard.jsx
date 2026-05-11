import React from 'react';
import PRODUTOS from '../lib/data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
  const totalProdutos = PRODUTOS.length;
  const totalCategorias = new Set(PRODUTOS.map(p => p.categoria)).size;
  const estoqueTotal = PRODUTOS.reduce((sum, p) => sum + p.cores.length, 0);
  const valorTotal = PRODUTOS.reduce((sum, p) => sum + (p.preco * p.cores.length), 0);

  const topProdutos = PRODUTOS
    .sort((a, b) => b.preco - a.preco)
    .slice(0, 10)
    .map(p => ({ name: p.nome, preco: p.preco }));

  const categoryData = Array.from(
    new Set(PRODUTOS.map(p => p.categoria))
  ).map(cat => ({
    name: cat,
    value: PRODUTOS.filter(p => p.categoria === cat).length
  }));

  const salesData = [
    { dia: 'Seg', vendas: 400 },
    { dia: 'Ter', vendas: 300 },
    { dia: 'Qua', vendas: 500 },
    { dia: 'Qui', vendas: 280 },
    { dia: 'Sex', vendas: 600 },
    { dia: 'Sáb', vendas: 450 },
    { dia: 'Dom', vendas: 350 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total de Produtos</h3>
            <p className="text-3xl font-bold text-blue-600">{totalProdutos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total de Categorias</h3>
            <p className="text-3xl font-bold text-green-600">{totalCategorias}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estoque Total</h3>
            <p className="text-3xl font-bold text-yellow-600">{estoqueTotal}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Valor Total</h3>
            <p className="text-3xl font-bold text-red-600">R$ {valorTotal.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top 10 Produtos por Preço</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topProdutos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="preco" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Distribuição por Categoria</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fluxo de Vendas (Semana)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="vendas" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
