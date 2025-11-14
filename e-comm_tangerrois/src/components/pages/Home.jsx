import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import '../styles/Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "",
      subtitle: "",
      image: "/Hero1.png"
    },
    {
      title: "",
      subtitle: "",
      image: "/Hero2.jpg"
    },
    {
      title: "",
      subtitle: "",
      image: "/Hero1.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      name: "Kitchen Appliances",
      count: 12,
      image: "https://picsum.photos/400/300?random=10"
    },
    {
      name: "Laundry",
      count: 8,
      image: "https://picsum.photos/400/300?random=11"
    },
    {
      name: "Home Appliances",
      count: 15,
      image: "https://picsum.photos/400/300?random=12"
    },
    {
      name: "Small Appliances",
      count: 6,
      image: "https://picsum.photos/400/300?random=13"
    }
  ];

  return (
    <div className="home">
      <div className="hero-slider" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
        <div className="hero-overlay"></div>
        <button className="slider-btn prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
          <FiChevronLeft size={32} />
        </button>

        <button className="slider-btn next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
          <FiChevronRight size={32} />
        </button>
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>

      <div className="search-section">
        <input type="text" placeholder="Search products..." className="search-input" />
        <button className="search-btn">
          <FiSearch size={20} />
        </button>
      </div>

      <div className="categories-section">
        <div className="filter-bar">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Price ascending</button>
          <button className="filter-btn">Price descending</button>
          <button className="filter-btn">Rating</button>
        </div>
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <Link to={`/products?category=${cat.name}`} key={idx} className="category-card">
              <div className="category-image" style={{ backgroundImage: `url(${cat.image})` }}></div>
              <h3>{cat.name}</h3>
              <p>${cat.count * 10}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
