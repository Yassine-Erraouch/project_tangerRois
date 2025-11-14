import { createContext, useContext, useReducer } from 'react';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    default:
      return state;
  }
};

const initialProducts = [
  {
    id: 1,
    name: "Smart Refrigerator",
    category: "Kitchen Appliances",
    price: 1299.99,
    rating: 4.5,
    reviews: 128,
    image: "https://picsum.photos/400/400?random=1",
    description: "Modern smart refrigerator with touch screen and energy-efficient cooling system."
  },
  {
    id: 2,
    name: "Washing Machine",
    category: "Laundry",
    price: 799.99,
    rating: 4.7,
    reviews: 256,
    image: "https://picsum.photos/400/400?random=2",
    description: "Front-load washing machine with multiple wash cycles and energy-saving features."
  },
  {
    id: 3,
    name: "Coffee Maker Pro",
    category: "Kitchen Appliances",
    price: 249.99,
    rating: 4.8,
    reviews: 342,
    image: "https://picsum.photos/400/400?random=3",
    description: "Professional coffee maker with programmable settings and thermal carafe."
  },
  {
    id: 4,
    name: "Dishwasher",
    category: "Kitchen Appliances",
    price: 649.99,
    rating: 4.6,
    reviews: 189,
    image: "https://picsum.photos/400/400?random=4",
    description: "Quiet and efficient dishwasher with multiple wash programs and stainless steel interior."
  },
  {
    id: 5,
    name: "Microwave Oven",
    category: "Kitchen Appliances",
    price: 199.99,
    rating: 4.4,
    reviews: 421,
    image: "https://picsum.photos/400/400?random=5",
    description: "Powerful microwave with convection cooking and smart sensor technology."
  },
  {
    id: 6,
    name: "Dryer Machine",
    category: "Laundry",
    price: 699.99,
    rating: 4.5,
    reviews: 167,
    image: "https://picsum.photos/400/400?random=6",
    description: "Energy-efficient dryer with sensor drying and wrinkle prevention features."
  }
];

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: initialProducts });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
