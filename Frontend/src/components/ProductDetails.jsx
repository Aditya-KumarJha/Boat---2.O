import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import instance from '../utils/axios';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import Loading from './Loading';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc]">
      <style>{`
        @keyframes scroll-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="relative p-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 p-2 rounded-full text-white hover:text-teal-300 transition"
        >
          <ArrowLeft size={26} />
        </button>
        {product?.model && (
          <h1 className="text-center underline text-3xl sm:text-4xl md:text-5xl font-bold mt-4 px-4">
            Product Detail of <span className="text-teal-200">"{product.model}"</span>
          </h1>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 px-6 sm:px-16 py-10">
        {product?.image && (
          <img
            src={product.image}
            alt={product.model}
            className="w-[300px] sm:w-[400px] md:w-[500px] object-contain rounded-xl shadow-xl"
          />
        )}
        <div className="flex flex-col gap-4 w-full sm:w-full max-w-5xl">
          {product?.title && (
            <p className="text-3xl md:text-4xl font-medium leading-snug tracking-tight text-justify break-words">
              {product.title}
            </p>
          )}

          {(product?.color || product?.connectivity_type) && (
            <div className="flex flex-wrap items-center gap-6 mt-2 text-lg md:text-xl font-semibold text-white">
              {product?.color && (
                <span className="bg-teal-800/60 px-4 py-2 rounded-lg shadow">
                  Color: <span className="text-teal-200">{product.color}</span>
                </span>
              )}
              {product?.connectivity_type && (
                <span className="bg-teal-800/60 px-4 py-2 rounded-lg shadow">
                  Connectivity: <span className="text-teal-200">{product.connectivity_type}</span>
                </span>
              )}
            </div>
          )}

          {(product?.actual_price && product?.selling_price) && (
            <div className="flex items-center gap-6 mt-4 text-2xl md:text-3xl font-bold text-white">
              <div className="bg-red-900/60 px-4 py-2 rounded-lg shadow">
                <span className="line-through text-red-300">₹{product.actual_price}</span>
              </div>
              <div className="bg-green-800/60 px-4 py-2 rounded-lg shadow">
                <span className="text-lime-200">Now ₹{product.selling_price}</span>
              </div>
            </div>
          )}

          {Array.isArray(product?.category) && product.category.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-base md:text-lg font-medium">
              <span className="text-white">Category:</span>
              {product.category.map((cat, index) => (
                <span
                  key={index}
                  className="bg-amber-700/60 text-amber-200 px-3 py-1 rounded-full shadow text-sm capitalize"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-8 py-4 sm:px-16 mt-8 mb-8">
        <h2 className="text-2xl sm:text-5xl font-semibold text-white">Similar Products</h2>
      </div>

      {similarProducts.length > 0 && (
        <div
          className="relative px-6 pb-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex w-max gap-4"
            style={{
              animation: 'scroll-loop 360s linear infinite',
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
                  className="group bg-white/10 rounded-xl p-4 hover:bg-white/20 transition backdrop-blur-sm shadow-md border border-white/10 w-[calc(100%/4-2rem)] min-w-[280px] max-w-[320px] mt-2"
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-52 object-fill mb-4 rounded-lg"
                      draggable="false"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/noimage.jpg';
                      }}
                    />
                    <h3 className="text-lg font-semibold text-white group-hover:text-teal-200 transition">
                      {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 capitalize">{item.type}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-base font-bold text-teal-300">₹{item.selling_price}</span>
                      <span className="line-through text-white/50 text-sm">₹{item.actual_price}</span>
                    </div>
                  </Link>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center text-sm text-[#f5f5dc]/60 mt-12 py-6">
        © 2025 Boat 2.0 — All rights reserved.
      </div>
    </div>
  );
};

export default ProductDetails;
