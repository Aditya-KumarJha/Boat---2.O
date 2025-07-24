import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import instance from '../utils/axios';
import Cubes from '../components/partials/Cubes';

const getRandomLaunchDate = () => {
  const today = new Date();
  const offsetDays = Math.floor(Math.random() * 13) + 3;
  const launchDate = new Date(today);
  launchDate.setDate(today.getDate() + offsetDays);
  return launchDate.toDateString();
};

const shuffleArray = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return toast.error('Please enter an email address');
    if (!emailRegex.test(email)) return toast.error('Please enter a valid email address');
    toast.success('Email registered successfully!');
    setEmail('');
  };

  useEffect(() => {
    const fetchUpcomingProducts = async () => {
      try {
        const res = await instance.get('/api/products');
        const filtered = res.data
          .filter((p) => p.id >= 251 && p.id <= 300)
          .map((p) => ({
            ...p,
            launchDate: getRandomLaunchDate(),
          }));
        const shuffled = shuffleArray(filtered);
        setAllProducts(shuffled);
        setHasMore(shuffled.length > 8);
      } catch (err) {
        console.error('❌ Failed to fetch upcoming products:', err);
      }
    };

    fetchUpcomingProducts();
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      const newCount = prev + 8;
      if (newCount >= allProducts.length) {
        setHasMore(false);
      }
      return newCount;
    });
  }, [allProducts]);

  useEffect(() => {
    if (!hasMore || allProducts.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore, hasMore, allProducts]);

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc] font-sans overflow-x-hidden">
      
      {/* 🔵 Ring behind Cube */}
      <div className="hidden lg:block absolute top-20 right-[4vw] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-teal-300/20 to-cyan-400/10 blur-3xl z-10 animate-pulse-slow pointer-events-none" />

      {/* 🧊 3D Cube */}
      <div className="absolute top-20 right-[4vw] w-[400px] h-[400px] z-20 hidden lg:block pointer-events-auto animate-float-slow">
        <Cubes />
      </div>

      <div className="relative z-10 px-6 py-4">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-teal-300 transition"
          >
            <ArrowLeft size={24} />
          </Link>
        </div>

        {/* 🧨 Title */}
        <h1 className="text-6xl md:text-9xl font-bold mb-8 ml-[10%] text-white drop-shadow-[0_2px_8px_rgba(0,255,255,0.3)] transition-all duration-500">
          Coming Soon
        </h1>

        {/* 📬 Subtitle */}
        <p className="max-w-xl text-lg text-white/90 mb-10 ml-[12%]">
          Subscribe to be the first to know about all the events and get a discount on your first order!
        </p>

        {/* 📩 Input + Submit */}
        <div className="flex items-center gap-4 ml-[12%] flex-wrap">
          <input
            type="email"
            placeholder="Please enter your valid email address"
            className="px-4 py-2 rounded-full w-80 text-black border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Submit
          </button>
        </div>

        {/* 🛍️ Products Preview */}
        <div className="relative z-10 mt-34 px-4">
          <p className="text-xl md:text-2xl text-center mb-10 opacity-90">
            Here's a sneak peek at what’s coming your way.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 
                  shadow-[0_0_15px_3px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_6px_rgba(255,255,255,0.25)] 
                  transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt="Upcoming product"
                  className="w-full h-56 object-cover object-center mb-4 rounded-lg"
                  draggable={false}
                  onClick={() => toast.info('Details unlock on launch day')}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/noimage.jpg';
                  }}
                />
                <p className="text-sm opacity-80 mb-2">₹{product.selling_price}</p>
                <p className="text-xs text-[#f5f5dc]/70">
                  Launching on {product.launchDate}
                </p>
              </div>
            ))}
          </div>

          {/* 🌀 Infinite scroll loader */}
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="mt-10 text-center text-[#f5f5dc]/70 h-10 flex justify-center items-center"
            >
              Loading more products...
            </div>
          )}
          {!hasMore && visibleProducts.length === 0 && (
            <p className="mt-10 text-center text-[#f5f5dc]/70">
              No products found in this range.
            </p>
          )}
        </div>
      </div>

      {/* ⛅ Animations */}
      <style>
        {`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float-slow {
            animation: floatSlow 6s ease-in-out infinite;
          }
          @keyframes pulseSlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .animate-pulse-slow {
            animation: pulseSlow 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ComingSoon;
