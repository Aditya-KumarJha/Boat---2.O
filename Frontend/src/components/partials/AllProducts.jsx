import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../utils/axios';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [showEndMessage, setShowEndMessage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get('/api/products');
        console.log(`[FETCHED] Total products: ${data.length}`);
        setAllProducts(data);
        setHasMore(data.length > 12);
      } catch (err) {
        console.error('[ERROR] Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      const newCount = prev + 12;
      if (newCount >= allProducts.length) {
        setHasMore(false);
        setShowEndMessage(true);
        setTimeout(() => setShowEndMessage(false), 3000);
      }
      return newCount;
    });
  }, [allProducts]);

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <div className="mt-20 space-y-6">
      <h2
        className="px-10 text-2xl font-semibold text-white mt-12 mb-6"
        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
      >
        All Products
      </h2>

      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="h-12 text-center text-white/70 flex items-center justify-center">
            Loading more...
          </div>
        }
        className="px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {visibleProducts.map((item) => (
          <Tilt
            key={item._id}
            glareEnable
            glareColor="white"
            glareMaxOpacity={0.2}
            scale={1.02}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="group bg-white/10 rounded-xl p-4 hover:bg-white/20 transition backdrop-blur-sm shadow-md border border-white/10"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-fill mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold text-white group-hover:text-teal-200 transition">
                  {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 capitalize">{item.type}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-base font-bold text-teal-300">
                    ₹{item.selling_price}
                  </span>
                  <span className="line-through text-white/50 text-sm">
                    ₹{item.actual_price}
                  </span>
                </div>
              </Link>
            </motion.div>
          </Tilt>
        ))}
      </InfiniteScroll>

      {/* Show "No more products" message for 3 seconds */}
      {showEndMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center text-white/60 text-sm mt-4"
        >
          🎉 You’ve reached the end. No more products!
        </motion.div>
      )}
    </div>
  );
};

export default AllProducts;
