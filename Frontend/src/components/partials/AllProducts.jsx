import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../utils/axios';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useUserContext } from '../../context/UserContext';

const AllProducts = ({ sortOption, searchTerm }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [bookmarked, setBookmarked] = useState({});
  const { user } = useUserContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await instance.get('/api/products');
        setAllProducts(data);
        setHasMore(data.length > 12);
      } catch (err) {
        console.error('[ERROR] Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  const matchesSearch = (product) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.title?.toLowerCase().includes(term) ||
      product.brand?.toLowerCase().includes(term) ||
      product.model?.toLowerCase().includes(term) ||
      product.color?.toLowerCase().includes(term) ||
      product.type?.toLowerCase().includes(term) ||
      product.form_factor?.toLowerCase().includes(term) ||
      product.connectivity_type?.toLowerCase().includes(term) ||
      product.category?.some((cat) => cat.toLowerCase().includes(term))
    );
  };

  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const applySortAndFilter = () => {
    let sorted = [...allProducts];

    const seen = new Set();
    sorted = sorted.filter((item) => {
      const key = item._id ?? item.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (
      ['Wireless', 'Popular', 'Limited', 'Gaming', 'Noise-Cancelling', 'Trending'].includes(sortOption)
    ) {
      sorted = sorted.filter((item) =>
        item.category?.some((cat) =>
          cat.toLowerCase().includes(sortOption.toLowerCase())
        )
      );
    }

    if (sortOption === 'Budget') {
      sorted.sort((a, b) => a.selling_price - b.selling_price);
    } else if (sortOption === 'Premium') {
      sorted.sort((a, b) => b.selling_price - a.selling_price);
    } else {
      sorted = shuffleArray(sorted);
    }

    return sorted.filter(matchesSearch);
  };

  useEffect(() => {
    const filtered = applySortAndFilter();
    setShuffledProducts(filtered);
    setVisibleCount(12);
    setHasMore(filtered.length > 12);
  }, [sortOption, allProducts, searchTerm]);

  const visibleProducts = shuffledProducts.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      const newCount = prev + 12;
      if (newCount >= shuffledProducts.length) {
        setHasMore(false);
        setShowEndMessage(true);
        setTimeout(() => setShowEndMessage(false), 3000);
      }
      return newCount;
    });
  }, [shuffledProducts]);

  const getHeading = () => {
    if (searchTerm) return `Search results for "${searchTerm}"`;
    if (!sortOption) return 'All Products';
    return `All Products in ‘${sortOption}’ category`;
  };

  useEffect(() => {
    if (user && user.bookmarkedProducts) {
      const initialBookmarks = {};
      user.bookmarkedProducts.forEach(pid => {
        initialBookmarks[pid] = true;
      });
      setBookmarked(initialBookmarks);
    }
  }, [user]);

  const handleBookmark = async (e, productId) => {
    e.stopPropagation();
    e.preventDefault(); // prevent <Link> navigation

    if (!user || !user.email) {
      toast.info('Login to bookmark', { autoClose: 2000 });
      return;
    }

    try {
      await instance.post('/api/users/bookmark', {
        email: user.email,
        productId,
      });

      toast.success('Bookmark added', { autoClose: 2000 });
      setBookmarked((prev) => ({ ...prev, [productId]: true }));
    } catch (err) {
      console.error('Bookmark error:', err);
      toast.error('Something went wrong', { autoClose: 2000 });
    }
  };

  return (
    <div className="mt-20 space-y-6">
      <h2
        className="px-10 text-2xl font-semibold text-white mt-12 mb-6"
        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
      >
        {getHeading()}
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
        {visibleProducts.map((item, index) => (
          <Tilt
            key={item._id ?? item.id}
            glareEnable
            glareColor="white"
            glareMaxOpacity={0.2}
            scale={1.02}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className={`relative group bg-white/10 rounded-xl p-4 hover:bg-white/20 transition backdrop-blur-sm shadow-md border border-white/10 ${index < 4 ? 'mt-10' : ''}`}
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-fill mb-4 rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/noimage.jpg';
                  }}
                />

                {/* 🔥 Bookmark Button Fix: Moved outside Link click propagation */}
                <button
                  onClick={(e) => handleBookmark(e, item._id)}
                  className="absolute top-5 right-6 z-10 text-white hover:scale-110 transition p-1 bg-black/50 rounded-full border border-[#FFD700]"
                  title="Bookmark"
                >
                  {bookmarked[item._id] ? (
                    <BookmarkCheck size={20} className="text-[#FFD700]" />
                  ) : (
                    <Bookmark size={20} className="text-white" />
                  )}
                </button>

                <h3 className="text-lg font-semibold text-white group-hover:text-teal-200 transition">
                  {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                </h3>
                <div className="mt-1 flex justify-between text-sm text-white/80 capitalize">
                  <span>{item.type}</span>
                  {sortOption && (
                    <span className="text-right">Category: {sortOption}</span>
                  )}
                </div>
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
