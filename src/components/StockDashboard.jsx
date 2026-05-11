import React, { useState } from 'react';

const StockDashboard = () => {
  const [stocks, setStocks] = useState([
    { id: 1, name: 'AAPL', quantity: 10, price: 150 },
    { id: 2, name: 'GOOGL', quantity: 5, price: 2800 },
    { id: 3, name: 'MSFT', quantity: 8, price: 300 }
  ]);

  const editQuantity = (index) => {
    const item = stocks[index];
    const newQuantity = prompt(`Digite a nova quantidade para ${item.name}:`, item.quantity.toString());
    if (newQuantity !== null && newQuantity !== '') {
      const parsedQuantity = parseInt(newQuantity);
      if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
        setStocks(prevStocks => {
          const newStocks = [...prevStocks];
          newStocks[index].quantity = parsedQuantity;
          return newStocks;
        });
      }
    }
  };

  const totalValue = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.price), 0);

  return (
    <div className="stock-dashboard">
      <h1>Dashboard de Ações</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>R$ {stock.price.toFixed(2)}</td>
              <td>R$ {(stock.quantity * stock.price).toFixed(2)}</td>
              <td>
                <button onClick={() => editQuantity(index)}>Editar Quantidade</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Valor Total do Portfólio: R$ {totalValue.toFixed(2)}</h2>
    </div>
  );
};

export default StockDashboard;
