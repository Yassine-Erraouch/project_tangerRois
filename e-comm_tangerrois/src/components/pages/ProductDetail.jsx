import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { state } = useProducts();
  const { dispatch } = useCart();
  
  const product = state.products.find(p => p.id === parseInt(id));

  if (!product) return <div className="loading">Product not found</div>;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert('Added to cart!');
  };

  const reviews = [
    { title: "Great Product!", author: "John Smith", rating: 5, text: "Excellent quality and fast delivery." },
    { title: "Worth the Price", author: "Sarah Johnson", rating: 4, text: "Good value for money, highly recommend." },
    { title: "Amazing!", author: "Mike Wilson", rating: 5, text: "Exceeded my expectations in every way." }
  ];

  return (
    <div className="product-detail">
      <div className="detail-header">
        <h2>product detail</h2>
      </div>

      <div className="detail-content">
        <div className="product-main">
          <div className="product-image-large" style={{ backgroundImage: `url(${product.image})` }}></div>
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="rating">
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
            <span>({product.reviews} reviews)</span>
          </div>
          <div className="price-tag">${product.price}</div>
          
          <div className="detail-section">
            <h3>Detail</h3>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>In Stock: Available for immediate shipping</p>
            <p>Warranty: 1 year manufacturer warranty included</p>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Latest reviews</h2>
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-stars">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <h4>{review.title}</h4>
              <p className="review-text">{review.text}</p>
              <div className="review-author">
                <div className="author-avatar"></div>
                <span>{review.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
