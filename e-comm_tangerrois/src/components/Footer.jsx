import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Shop</h4>
          <ul>
            <li>Kitchen Appliances</li>
            <li>Laundry</li>
            <li>Electronics</li>
            <li>All Products</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li>Our Story</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <FaTwitter className="social-icon" size={24} />
        <FaInstagram className="social-icon" size={24} />
        <FaFacebook className="social-icon" size={24} />
        <FaLinkedin className="social-icon" size={24} />
        <MdEmail className="social-icon" size={24} />
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TR Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
