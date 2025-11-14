import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { FiSearch } from 'react-icons/fi';
import '../styles/Products.css';

const Products = () => {
  const { state } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');

  const filteredProducts = state.products
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button><FiSearch size={20} /></button>
        </div>
      </div>

      <div className="filter-bar">
        <button className={sortBy === 'all' ? 'active' : ''} onClick={() => setSortBy('all')}>All</button>
        <button className={sortBy === 'price-asc' ? 'active' : ''} onClick={() => setSortBy('price-asc')}>Price ascending</button>
        <button className={sortBy === 'price-desc' ? 'active' : ''} onClick={() => setSortBy('price-desc')}>Price descending</button>
        <button className={sortBy === 'rating' ? 'active' : ''} onClick={() => setSortBy('rating')}>Rating</button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}></div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-desc">{product.description.substring(0, 60)}...</p>
              <div className="product-footer">
                <span className="price">${product.price}</span>
                <Link to={`/products/${product.id}`} className="view-btn">Button</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
