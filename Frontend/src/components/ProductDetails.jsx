import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import instance from '../utils/axios';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Loading from './Loading';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../context/UserContext';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState({});
  const { user } = useUserContext();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/api/products/${id}`);
        setProduct(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!product || !Array.isArray(product.category)) return;

      try {
        const { data } = await instance.get('/api/products');
        const filtered = data.filter(
          (item) =>
            item._id !== product._id &&
            Array.isArray(item.category) &&
            item.category.some((cat) => product.category.includes(cat))
        );

        const timestamp = Date.now();
        const duplicated = [...filtered, ...filtered].map((item, idx) => ({
          ...item,
          _uniqueKey: `${item._id}-${idx}-${timestamp}`,
        }));

        setSimilarProducts(duplicated);
      } catch (err) {
        console.error('Error fetching similar products', err);
      }
    };

    fetchSimilar();
  }, [product]);

  useEffect(() => {
    if (user && user.bookmarkedProducts) {
      const initialBookmarks = {};
      user.bookmarkedProducts.forEach(pid => {
        initialBookmarks[pid] = true;
      });
      setBookmarked(initialBookmarks);
    }
  }, [user]);

  const handleBookmark = async (productId) => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ minHeight: '100vh' }} className="bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc]">
      <style>{`
        @keyframes scroll-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <div style={{ padding: '1.5rem' }} className="relative">
        <button
          onClick={() => navigate(-1)}
          style={{ left: '1rem', top: '1rem', padding: '0.5rem' }}
          className="absolute rounded-full text-white hover:text-teal-300 transition"
        >
          <ArrowLeft size={2.2 * 16} />
        </button>
        {product?.model && (
          <h1 style={{ marginTop: '1rem', padding: '0 1rem' }} className="text-center underline text-[1.5rem] sm:text-[1.875rem] md:text-[2.25rem] font-bold">
            Product Detail of <span className="text-teal-200">"{product.model}"</span>
          </h1>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-[1.5rem] px-[1rem] sm:px-[2rem] md:px-[3rem] py-[2rem]">
        <div className="relative">
          {product?.image && (
            <img
              src={product.image}
              alt={product.model}
              className="w-[80vw] sm:w-[65vw] md:w-[55vw] lg:w-[30rem] object-contain rounded-xl shadow-xl"
            />
          )}
          <button
            onClick={() => handleBookmark(product._id)}
            className="absolute top-3 right-3 text-white bg-black/50 border border-[#FFD700] rounded-full p-1 hover:scale-110 transition"
            title="Bookmark"
          >
            {bookmarked[product._id] ? (
              <BookmarkCheck size={22} className="text-[#FFD700]" />
            ) : (
              <Bookmark size={22} className="text-white" />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-[1rem] w-full max-w-[80rem]">
          {product?.title && (
            <p className="text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.875rem] font-medium leading-snug tracking-tight text-justify break-words">
              {product.title}
            </p>
          )}

          {(product?.color || product?.connectivity_type) && (
            <div className="flex flex-wrap items-center gap-[1rem] text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] font-semibold text-white">
              {product?.color && (
                <span className="bg-teal-800/60 px-[0.75rem] py-[0.5rem] rounded-lg shadow">
                  Color: <span className="text-teal-200">{product.color}</span>
                </span>
              )}
              {product?.connectivity_type && (
                <span className="bg-teal-800/60 px-[0.75rem] py-[0.5rem] rounded-lg shadow">
                  Connectivity: <span className="text-teal-200">{product.connectivity_type}</span>
                </span>
              )}
            </div>
          )}

          {(product?.actual_price && product?.selling_price) && (
            <div className="flex items-center gap-[1rem] text-[1.25rem] sm:text-[1.5rem] md:text-[1.875rem] font-bold text-white mt-[1rem]">
              <div className="bg-red-900/60 px-[0.75rem] py-[0.5rem] rounded-lg shadow">
                <span className="line-through text-red-300">₹{product.actual_price}</span>
              </div>
              <div className="bg-green-800/60 px-[0.75rem] py-[0.5rem] rounded-lg shadow">
                <span className="text-lime-200">Now ₹{product.selling_price}</span>
              </div>
            </div>
          )}

          {Array.isArray(product?.category) && product.category.length > 0 && (
            <div className="mt-[1rem] flex flex-wrap items-center gap-[0.5rem] text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-medium">
              <span className="text-white">Category:</span>
              {product.category.map((cat, index) => (
                <span
                  key={index}
                  className="bg-amber-700/60 text-amber-200 px-[0.75rem] py-[0.5rem] rounded-full shadow text-[0.75rem] capitalize"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="py-[1rem] mt-[2rem] mb-[1rem] px-[1rem] sm:px-[2rem] md:px-[4rem]">
        <h2 className="text-[1.25rem] sm:text-[2rem] md:text-[3rem] font-semibold text-white">Similar Products</h2>
      </div>

      {similarProducts.length > 0 && (
        <div
          className="relative overflow-x-hidden pt-[2rem] pb-[5rem] px-[1rem] sm:px-[1.5rem]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex gap-[2rem] min-w-[200%] will-change-transform"
            style={{
              animationName: 'scroll-loop',
              animationDuration: '20s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {similarProducts.map((item, index) => (
              <Tilt
                key={item._uniqueKey || `${item._id}-${index}`}
                glareEnable
                glareColor="white"
                glareMaxOpacity={0.2}
                scale={1.02}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group bg-white/10 rounded-xl p-[0.75rem] sm:p-[1rem] hover:bg-white/20 transition backdrop-blur-sm shadow-md border border-white/10 w-[65vw] sm:w-[55vw] md:w-[45vw] lg:w-[20rem] mt-[0.5rem] relative"
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[11rem] sm:h-[13rem] object-fill mb-[1rem] rounded-lg"
                      draggable="false"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/noimage.jpg';
                      }}
                    />
                    <h3 className="text-[1rem] sm:text-[1.125rem] font-semibold text-white group-hover:text-teal-200 transition">
                      {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                    </h3>
                    <p className="mt-[0.25rem] text-[0.75rem] sm:text-[0.875rem] text-white/80 capitalize">{item.type}</p>
                    <div className="mt-[0.5rem] flex items-center justify-between">
                      <span className="text-[0.875rem] sm:text-[1rem] font-bold text-teal-300">₹{item.selling_price}</span>
                      <span className="line-through text-white/50 text-[0.75rem] sm:text-[0.875rem]">₹{item.actual_price}</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookmark(item._id);
                    }}
                    className="absolute top-4 right-4 text-white bg-black/50 border border-[#FFD700] rounded-full p-1 hover:scale-110 transition"
                    title="Bookmark"
                  >
                    {bookmarked[item._id] ? (
                      <BookmarkCheck size={20} className="text-[#FFD700]" />
                    ) : (
                      <Bookmark size={20} className="text-white" />
                    )}
                  </button>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center text-[0.75rem] sm:text-[0.875rem] text-[#f5f5dc]/60 mt-[3rem] pb-[1.5rem]">
        © 2025 Boat 2.0 — All rights reserved.
      </div>
    </div>
  );
};

export default ProductDetails;
