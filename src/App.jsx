import React from 'react';
import { useAuth } from './hooks/useAuth';
import useCartStore from './stores/useCartStore';

function App() {
  const { user, login, logout, isLoading: authLoading } = useAuth();
  const cartStore = useCartStore();
  const { items, addItem, removeItem, isLoading: cartLoading } = cartStore;

  const products = [
    { id: 1, name: 'Produto 1', price: 10 },
    { id: 2, name: 'Produto 2', price: 20 },
    { id: 3, name: 'Produto 3', price: 30 },
  ];

  if (authLoading || cartLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <nav className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Loja React</h1>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-lg">Olá, {user.name}!</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <main className="flex gap-8 max-w-6xl mx-auto">
        <section className="flex-1">
          <h2 className="text-2xl font-semibold mb-6">Produtos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-4">R$ {product.price}</p>
                <button
                  onClick={() => addItem(product)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="w-80 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Carrinho ({items.length})</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Carrinho vazio</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-lg font-bold text-green-600">R$ {item.price}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
