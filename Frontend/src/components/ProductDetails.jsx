import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import instance from '../utils/axios';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Loading from './Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../context/userContext';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    backendUser,
    isSignedIn,
    addToCollection,
    removeFromCollection,
    isInCollection,
  } = useUserContext();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
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
      if (!product?.category) return;
      try {
        const { data } = await instance.get('/api/products');
        const filtered = data.filter(
          (item) =>
            item._id !== product._id &&
            item.category?.some((cat) => product.category.includes(cat))
        );
        const timestamp = Date.now();
        const duplicated = [...filtered, ...filtered].map((item, idx) => ({
          ...item,
          _uniqueKey: `${item._id}-${idx}-${timestamp}`,
        }));
        setSimilarProducts(duplicated);
      } catch (err) {
        console.error('Error fetching similar products:', err);
      }
    };
    fetchSimilar();
  }, [product]);

  const handleBookmark = async (productId) => {
    if (!isSignedIn) {
      toast.info('Login to bookmark', { autoClose: 2000 });
      return;
    }

    try {
      if (isInCollection(productId)) {
        await removeFromCollection(productId);
        toast.success('Bookmark removed', { autoClose: 2000 });
      } else {
        await addToCollection(productId);
        toast.success('Bookmark added', { autoClose: 2000 });
      }
    } catch (err) {
      console.error('Bookmark error:', err);
      toast.error('Something went wrong', { autoClose: 2000 });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc]" style={{ minHeight: '100vh' }}>
      <style>{`
        @keyframes scroll-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      <div className="relative p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white rounded-full hover:text-teal-300 transition"
        >
          <ArrowLeft size={36} />
        </button>
        {product?.model && (
          <h1 className="mt-10 text-center text-2xl sm:text-3xl md:text-4xl font-bold underline">
            Product Detail of <span className="text-teal-200">"{product.model}"</span>
          </h1>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 px-4 sm:px-8 md:px-12 py-8">
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
            {isInCollection(product._id) ? (
              <BookmarkCheck size={22} className="text-[#FFD700]" />
            ) : (
              <Bookmark size={22} className="text-white" />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-4xl">
          {product?.title && (
            <p className="text-base sm:text-xl md:text-2xl font-medium leading-snug tracking-tight text-justify break-words">
              {product.title}
            </p>
          )}

          {(product?.color || product?.connectivity_type) && (
            <div className="flex flex-wrap gap-4 text-white font-semibold">
              {product?.color && (
                <span className="bg-teal-800/60 px-3 py-2 rounded-lg shadow">
                  Color: <span className="text-teal-200">{product.color}</span>
                </span>
              )}
              {product?.connectivity_type && (
                <span className="bg-teal-800/60 px-3 py-2 rounded-lg shadow">
                  Connectivity: <span className="text-teal-200">{product.connectivity_type}</span>
                </span>
              )}
            </div>
          )}

          {(product?.actual_price && product?.selling_price) && (
            <div className="flex items-center gap-4 text-white font-bold text-xl md:text-2xl">
              <div className="bg-red-900/60 px-3 py-2 rounded-lg shadow">
                <span className="line-through text-red-300">₹{product.actual_price}</span>
              </div>
              <div className="bg-green-800/60 px-3 py-2 rounded-lg shadow">
                <span className="text-lime-200">Now ₹{product.selling_price}</span>
              </div>
            </div>
          )}

          {Array.isArray(product?.category) && product.category.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 text-sm sm:text-base font-medium">
              <span className="text-white">Category:</span>
              {product.category.map((cat, i) => (
                <span key={i} className="bg-amber-700/60 text-amber-200 px-3 py-1 rounded-full shadow capitalize text-sm">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <>
          <div className="px-4 sm:px-8 md:px-16 py-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">Similar Products</h2>
          </div>
          <div
            className="relative overflow-x-hidden pt-4 pb-20 px-4 sm:px-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex gap-6 min-w-[200%] will-change-transform"
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
                    className="group bg-white/10 rounded-xl p-3 hover:bg-white/20 transition backdrop-blur-sm shadow-md border border-white/10 w-[65vw] sm:w-[55vw] md:w-[45vw] lg:w-[20rem] relative"
                  >
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-44 sm:h-52 object-fill mb-3 rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/noimage.jpg';
                        }}
                      />
                      <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-teal-200 transition">
                        {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                      </h3>
                      <p className="text-sm text-white/80 capitalize">{item.type}</p>
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="font-bold text-teal-300">₹{item.selling_price}</span>
                        <span className="line-through text-white/50">₹{item.actual_price}</span>
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
                      {isInCollection(item._id) ? (
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
        </>
      )}

      <div className="text-center text-sm text-[#f5f5dc]/60 mt-12 pb-6">
        © 2025 Boat 2.0 — All rights reserved.
      </div>
    </div>
  );
};

export default ProductDetails;
