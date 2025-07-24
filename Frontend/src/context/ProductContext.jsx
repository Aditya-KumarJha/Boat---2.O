import React, { createContext, useState, useEffect, useContext } from 'react';
import instance from '../utils/axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingHighlights, setLoadingHighlights] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const { data } = await instance.get('/api/products');
        const grouped = data.reduce((acc, item) => {
          const type = item.type?.trim().toLowerCase();
          if (!type || type === 'unknown') return acc;
          if (!acc[item.type]) acc[item.type] = [];
          acc[item.type].push(item);
          return acc;
        }, {});
        const randomSelections = Object.values(grouped)
          .map((group) => group[Math.floor(Math.random() * group.length)])
          .filter(Boolean);
        const timestamp = Date.now();
        const duplicated = [...randomSelections, ...randomSelections].map((item, idx) => ({
          ...item,
          _uniqueKey: `${item._id}-${idx}-${timestamp}`,
        }));
        setHighlights(duplicated);
      } catch (err) {
        console.error('Error fetching highlights', err);
      } finally {
        setLoadingHighlights(false);
      }
    };
    fetchHighlights();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        highlights,
        loadingProducts,
        loadingHighlights,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
