import React from 'react';
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
  Line,
} from 'recharts';

const COLORS = ['#14B8A6', '#3B82F6', '#EF4444', '#F59E0B'];

const AdminDashboard = () => {
  const products = [
    { name: 'Camiseta Azul Marinho', category: 'Camisetas', stock: 45, price: 89.90, sales: 150 },
    { name: 'Camiseta Branca', category: 'Camisetas', stock: 60, price: 79.90, sales: 200 },
    { name: 'Camiseta Preta', category: 'Camisetas', stock: 35, price: 89.90, sales: 180 },
    { name: 'Camiseta Floral', category: 'Camisetas', stock: 25, price: 99.90, sales: 120 },
    { name: 'Camiseta Esportiva', category: 'Camisetas', stock: 50, price: 109.90, sales: 90 },
    { name: 'Camiseta Listrada', category: 'Camisetas', stock: 40, price: 84.90, sales: 140 },
    { name: 'Calça Jeans Skinny', category: 'Calças', stock: 30, price: 159.90, sales: 80 },
    { name: 'Calça Social Preta', category: 'Calças', stock: 20, price: 199.90, sales: 60 },
    { name: 'Calça Moletom', category: 'Calças', stock: 55, price: 129.90, sales: 110 },
    { name: 'Vestido Verão', category: 'Vestidos', stock: 15, price: 249.90, sales: 70 },
    { name: 'Vestido Longo', category: 'Vestidos', stock: 10, price: 299.90, sales: 50 },
    { name: 'Cinto Couro', category: 'Acessórios', stock: 80, price: 79.90, sales: 100 },
  ];

  const totalProducts = products.length;
  const categoriesSet = new Set(products.map((p) => p.category));
  const totalCategories = categoriesSet.size;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const topProducts = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10)
    .map((p) => ({ name: p.name, sales: p.sales }));

  const categories = Array.from(categoriesSet);
  const catSales = categories.map((cat) => ({
    name: cat,
    value: products
      .filter((p) => p.category === cat)
      .reduce((s, p) => s + p.sales, 0),
  }));

  const salesFlow = [
    { day: 'Seg', vendas: 150 },
    { day: 'Ter', vendas: 200 },
    { day: 'Qua', vendas: 180 },
    { day: 'Qui', vendas: 220 },
    { day: 'Sex', vendas: 250 },
    { day: 'Sáb', vendas: 300 },
    { day: 'Dom', vendas: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            Painel Admin Galene
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Total de Produtos</h3>
            <p className="text-3xl font-bold text-teal-600">{totalProducts}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Total de Categorias</h3>
            <p className="text-3xl font-bold text-blue-600">{totalCategories}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Estoque Total</h3>
            <p className="text-3xl font-bold text-emerald-600">{totalStock.toLocaleString('pt-BR')}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Valor Total em Estoque</h3>
            <p className="text-3xl font-bold text-purple-600 whitespace-nowrap">{totalValue}</p>
          </div>
        </div>

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Top 10 Produtos Mais Vendidos</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" angle={-45} height={80} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#14B8A6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Distribuição por Categoria</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={catSales}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {catSales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Fluxo de Vendas (Semana)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesFlow}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="vendas"
                    stroke="#14B8A6"
                    strokeWidth={4}
                    dot={{ fill: '#14B8A6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
