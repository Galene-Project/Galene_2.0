import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminReports = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('name, category, price, price_original, discount_percentage');
      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const prices = products.map(p => p.price).filter(p => p != null);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const avgPrice = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;

  const categories = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { count: 0, total: 0 };
    }
    acc[p.category].count += 1;
    acc[p.category].total += p.price || 0;
    return acc;
  }, {});

  const totalStockValue = products.reduce((sum, p) => sum + (p.price || 0), 0);

  const topPrice = [...products]
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 10);

  const topDiscount = [...products]
    .sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0))
    .slice(0, 10);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center text-xl py-12">Carregando dados...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Relatórios Admin</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Produtos por Categoria</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Categoria</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Quantidade</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categories).map(([cat, data]) => (
              <tr key={cat}>
                <td className="border border-gray-300 px-4 py-2">{cat}</td>
                <td className="border border-gray-300 px-4 py-2">{data.count}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {data.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Valor Total do Estoque</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Produto</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Valor Unitário</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{p.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {(p.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="bg-gray-100 border border-gray-300 font-bold px-4 py-2 text-right">
                Total: {totalStockValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Produtos com Maior Preço (Top 10)</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Produto</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Preço</th>
            </tr>
          </thead>
          <tbody>
            {topPrice.map((p, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{p.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {(p.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Produtos com Maior Desconto (Top 10)</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Produto</th>
              <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">Desconto (%)</th>
            </tr>
          </thead>
          <tbody>
            {topDiscount.map((p, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{p.name}</td>
                <td className="border border-gray-300 px-4 py-2">{(p.discount_percentage || 0).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Resumo de Preços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center border">
            <span className="block text-lg font-semibold text-blue-800 mb-2">Preço Mínimo</span>
            <span className="text-3xl font-bold text-blue-600">
              {minPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center border">
            <span className="block text-lg font-semibold text-green-800 mb-2">Preço Máximo</span>
            <span className="text-3xl font-bold text-green-600">
              {maxPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg text-center border">
            <span className="block text-lg font-semibold text-yellow-800 mb-2">Preço Médio</span>
            <span className="text-3xl font-bold text-yellow-600">
              {avgPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
