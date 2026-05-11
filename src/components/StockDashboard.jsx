import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchStocks() {
      const { data, error } = await supabase
        .from('stock')
        .select('*, products(name), sizes(name)');
      if (error) {
        console.error(error);
      } else {
        setStocks(data || []);
      }
    }
    fetchStocks();
  }, []);

  const updateQuantity = async (stockId, newQuantity) => {
    const { error } = await supabase
      .from('stock')
      .update({ quantity: newQuantity })
      .eq('id', stockId)
      .select();
    if (error) {
      console.error(error);
      return false;
    }
    setStocks(prev =>
      prev.map(stock => (stock.id === stockId ? { ...stock, quantity: newQuantity } : stock))
    );
    return true;
  };

  const increment = (stock) => {
    updateQuantity(stock.id, stock.quantity + 1);
  };

  const decrement = (stock) => {
    if (stock.quantity > 0) {
      updateQuantity(stock.id, stock.quantity - 1);
    }
  };

  const editQuantity = (stock) => {
    const newQtyStr = prompt(`Nova quantidade para ${stock.products?.name} - ${stock.sizes?.name}:`, stock.quantity);
    if (newQtyStr !== null) {
      const newQty = parseInt(newQtyStr);
      if (!isNaN(newQty) && newQty >= 0) {
        updateQuantity(stock.id, newQty);
      }
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.products?.name?.toLowerCase().includes(filter.toLowerCase()) ?? false
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por produto"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Produto</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tamanho</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantidade</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.products?.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stock.sizes?.name}</td>
              <td
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  backgroundColor: stock.quantity < 5 ? '#ffcccc' : 'transparent',
                  color: stock.quantity < 5 ? 'red' : 'black',
                  fontWeight: stock.quantity < 5 ? 'bold' : 'normal'
                }}
              >
                {stock.quantity}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => increment(stock)} style={{ marginRight: '5px' }}>+</button>
                <button onClick={() => decrement(stock)} style={{ marginRight: '5px' }}>-</button>
                <button onClick={() => editQuantity(stock)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockDashboard;
