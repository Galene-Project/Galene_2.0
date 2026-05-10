import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    const { data, error } = await supabase
      .from('stock')
      .select('*')
      .order('produto', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setStocks(data || []);
      setFilteredStocks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const filtered = stocks.filter((stock) =>
      stock.produto.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [filter, stocks]);

  const updateQuantity = async (id, newQty) => {
    const { error } = await supabase
      .from('stock')
      .update({ quantidade: newQty })
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      fetchStocks();
    }
  };

  const increment = (id) => {
    const stock = stocks.find((s) => s.id === id);
    if (stock) {
      updateQuantity(id, stock.quantidade + 1);
    }
  };

  const decrement = (id) => {
    const stock = stocks.find((s) => s.id === id);
    if (stock && stock.quantidade > 0) {
      updateQuantity(id, stock.quantidade - 1);
    }
  };

  const editQuantity = (id) => {
    const stock = stocks.find((s) => s.id === id);
    if (!stock) return;

    const newQty = prompt(`Nova quantidade para ${stock.produto} - ${stock.tamanho}:`, stock.quantidade);
    if (newQty !== null && !isNaN(newQty) && parseInt(newQty) >= 0) {
      updateQuantity(id, parseInt(newQty));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Filtrar por produto..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filteredStocks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum estoque encontrado{filter && ` para "${filter}"`}.
          </p>
        </div>
      )}

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tamanho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStocks.map((stock) => (
              <tr
                key={stock.id}
                className={`hover:bg-gray-50 ${
                  stock.quantidade < 5
                    ? 'bg-red-50 border-l-4 border-red-400'
                    : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stock.produto}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stock.tamanho}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {stock.quantidade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => decrement(stock.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium mr-2 transition-colors"
                    disabled={stock.quantidade <= 0}
                  >
                    -
                  </button>
                  <button
                    onClick={() => increment(stock.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium mr-2 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => editQuantity(stock.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockDashboard;
