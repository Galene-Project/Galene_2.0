import React from 'react';
import AdminAccessSimplified from './AdminAccessSimplified'; // Adjust the import path as necessary

const GaleneStore = ({ isAdmin = false }) => {
  if (isAdmin) {
    return <AdminAccessSimplified />;
  }

  return (
    <div className="galene-store">
      <h1>Galene Store Catalog</h1>
      <div className="catalog">
        {/* Example catalog items - replace with your actual catalog logic, e.g., product list from API */}
        <div className="product">
          <h2>Product 1</h2>
          <p>Price: $10</p>
          <button>Add to Cart</button>
        </div>
        <div className="product">
          <h2>Product 2</h2>
          <p>Price: $20</p>
          <button>Add to Cart</button>
        </div>
        {/* Add more products here */}
      </div>
    </div>
  );
};

export default GaleneStore;
