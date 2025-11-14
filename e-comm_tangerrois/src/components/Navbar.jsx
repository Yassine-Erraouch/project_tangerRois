import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import '../styles/Navbar.css';

const Navbar = () => {
  const { state } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/TR.png" alt="TR Logo" className="logo-image" />
        </Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <Link to="/cart" className="cart-icon">
          <FiShoppingCart size={24} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
