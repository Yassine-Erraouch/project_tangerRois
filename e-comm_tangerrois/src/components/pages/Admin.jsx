import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import '../styles/Admin.css';

const Admin = () => {
  const { state, dispatch } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: '',
    category: '',
    price: '',
    rating: '',
    reviews: '',
    image: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: currentProduct });
    } else {
      const newProduct = {
        ...currentProduct,
        id: Date.now(),
        price: parseFloat(currentProduct.price),
        rating: parseFloat(currentProduct.rating),
        reviews: parseInt(currentProduct.reviews)
      };
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      id: null,
      name: '',
      category: '',
      price: '',
      rating: '',
      reviews: '',
      image: '',
      description: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="admin-form">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={currentProduct.category}
            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Rating (0-5)"
            value={currentProduct.rating}
            onChange={(e) => setCurrentProduct({ ...currentProduct, rating: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Number of Reviews"
            value={currentProduct.reviews}
            onChange={(e) => setCurrentProduct({ ...currentProduct, reviews: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={currentProduct.image}
            onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
            required
          />
          <div className="form-actions">
            <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
            {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="products-list">
        <h2>Products List</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map(product => (
              <tr key={product.id}>
                <td><div className="table-image" style={{ backgroundImage: `url(${product.image})` }}></div></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.rating} ★</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
