import React, { useState, useEffect } from 'react';
import AdminAccessSimplified from './AdminAccessSimplified';

const GaleneStore = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const sampleProducts = [
      { id: 1, name: 'Product 1', price: '$19.99', image: 'https://via.placeholder.com/300x200?text=Product+1' },
      { id: 2, name: 'Product 2', price: '$29.99', image: 'https://via.placeholder.com/300x200?text=Product+2' },
      { id: 3, name: 'Product 3', price: '$39.99', image: 'https://via.placeholder.com/300x200?text=Product+3' },
      { id: 4, name: 'Product 4', price: '$49.99', image: 'https://via.placeholder.com/300x200?text=Product+4' },
    ];
    setProducts(sampleProducts);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getCartCount = () => cart.length;

  return (
    <div className="galene-store-layout">
      <header className="store-header">
        <div className="header-content">
          <h1 className="store-title">Galene Store</h1>
          <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
            🛒 <span className="cart-count">{getCartCount()}</span>
          </div>
        </div>
      </header>

      <nav className="store-navigation">
        <ul className="nav-list">
          <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="#products" className="nav-link">Products</a></li>
          <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
          <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      <main className="store-main products-section">
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {cartVisible && (
        <div className="cart-modal">
          <div className="cart-content">
            <h2>Shopping Cart ({getCartCount()})</h2>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>{item.price}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <button className="checkout-btn">Checkout</button>
            <button className="close-cart" onClick={() => setCartVisible(false)}>Close</button>
          </div>
        </div>
      )}

      <footer className="store-footer">
        <div className="footer-content">
          <p>&copy; 2024 Galene Store. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a> | <a href="#terms">Terms</a>
          </div>
        </div>
      </footer>

      <div className="floating-admin-btn">
        <AdminAccessSimplified />
      </div>
    </div>
  );
};

export default GaleneStore;
