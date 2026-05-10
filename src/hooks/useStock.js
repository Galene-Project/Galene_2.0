import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useStock() {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStockByProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('stock')
        .select('*')
        .eq('product_id', productId);

      if (fetchError) throw fetchError;

      setStocks((prev) => ({ ...prev, [productId]: data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (stockId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from('stock')
        .update({ quantity })
        .eq('id', stockId);

      if (updateError) throw updateError;

      setStocks((prev) => ({ ...prev }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = (productId) => {
    const stock = stocks[productId];
    return stock && stock.length > 0 && stock[0].quantity > 0;
  };

  return {
    stocks,
    loading,
    error,
    getStockByProduct,
    updateStock,
    checkAvailability,
  };
}
