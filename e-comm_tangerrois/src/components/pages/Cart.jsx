import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Order placed successfully!');
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>panier</h1>
      
      <div className="cart-items">
        {state.items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-desc">{item.description.substring(0, 80)}...</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-price">${item.price * item.quantity}</div>
            <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${total}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Commander
        </button>
      </div>
    </div>
  );
};

export default Cart;
