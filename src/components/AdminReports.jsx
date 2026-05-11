import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminReports = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, stock, price');
    if (error) console.error(error);
    if (data) setProducts(data);
    setLoading(false);
  };

  const productsByCategory = products.reduce((acc, product) => {
    const cat = product.category || 'Sem Categoria';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const totalStockValue = products.map(p => ({
    name: p.name,
    stock: p.stock,
    price: p.price,
    total: (p.stock * p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }));

  const lowStockProducts = products
    .filter(p => p.stock < 10)
    .sort((a, b) => a.stock - b.stock);

  const bestSoldProducts = products
    .filter(p => p.stock < 20)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 10);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Painel de Relatórios - Admin</h1>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos por Categoria</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Categoria</th>
                <th className="px-4 py-2 text-left">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(productsByCategory).map(([cat, count]) => (
                <tr key={cat} className="border-t">
                  <td className="px-4 py-2">{cat}</td>
                  <td className="px-4 py-2 font-semibold">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Valor Total do Estoque (por produto)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Produto</th>
                <th className="px-4 py-2 text-left">Estoque</th>
                <th className="px-4 py-2 text-left">Preço</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {totalStockValue.map((p, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td className="px-4 py-2 font-semibold">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos com Estoque Baixo (&lt; 10)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Produto</th>
                <th className="px-4 py-2 text-left">Estoque</th>
                <th className="px-4 py-2 text-left">Preço</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-gray-500">Nenhum produto com estoque baixo</td>
                </tr>
              ) : (
                lowStockProducts.map((p, idx) => (
                  <tr key={p.id || idx} className="border-t">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2 text-red-600 font-semibold">{p.stock}</td>
                    <td className="px-4 py-2">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos Mais Vendidos (simulado por estoque baixo)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Produto</th>
                <th className="px-4 py-2 text-left">Estoque Restante</th>
                <th className="px-4 py-2 text-left">Preço</th>
              </tr>
            </thead>
            <tbody>
              {bestSoldProducts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-gray-500">Nenhum dado disponível</td>
                </tr>
              ) : (
                bestSoldProducts.map((p, idx) => (
                  <tr key={p.id || idx} className="border-t">
                    <td className="px-4 py-2 font-semibold">{p.name}</td>
                    <td className="px-4 py-2">{p.stock}</td>
                    <td className="px-4 py-2">{p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminReports;
