import React, { useEffect, useState } from 'react';
import instance from '../../utils/axios';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useUserContext } from '../../context/userContext';

const HighlightedProducts = () => {
  const [highlights, setHighlights] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const { backendUser, isSignedIn, toggleCollection, isInCollection } = useUserContext();

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
      }
    };

    fetchHighlights();
  }, []);

  const handleBookmark = async (productId) => {
    if (!isSignedIn || !backendUser?.email) {
      toast.info('Login to bookmark', { autoClose: 2000 });
      return;
    }

    try {
      await toggleCollection(productId);
    } catch (err) {
      console.error('Bookmark error:', err);
      toast.error('Something went wrong', { autoClose: 2000 });
    }
  };

  return (
    <div>
      <style>
        {`
          @keyframes scroll-loop {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .gold-border {
            border: 2px solid #FFD700;
            border-radius: 6px;
            padding: 4px;
            background-color: rgba(0,0,0,0.4);
          }
        `}
      </style>

      <h2 className="px-10 text-2xl font-semibold text-white mt-12 mb-6" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
        Category Standouts
      </h2>

      <div className="px-6 pb-10 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="flex w-max gap-2" style={{
          animation: 'scroll-loop 15s linear infinite',
          animationPlayState: isHovered ? 'paused' : 'running',
        }}>
          {highlights.map((item, index) => (
            <Tilt
              key={item._uniqueKey || `${item._id}-${index}`}
              glareEnable
              glareColor="white"
              glareMaxOpacity={0.2}
              scale={1.02}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative group bg-white/10 rounded-xl p-4 hover:bg-white/20 transition backdrop-blur-sm shadow-md border border-white/10 w-[calc(100%/4-2rem)] min-w-[280px] max-w-[320px]"
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
                  <h3 className="text-lg font-semibold text-white transition">
                    {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/80 capitalize">{item.type}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-bold text-white">₹{item.selling_price}</span>
                    <span className="line-through text-white/50 text-sm">₹{item.actual_price}</span>
                  </div>
                </Link>

                <button
                  onClick={() => handleBookmark(item._id)}
                  className="absolute top-5 right-6 z-10 text-white hover:scale-110 transition p-1 bg-black/50 rounded-full border border-[#FFD700]"
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
    </div>
  );
};

export default HighlightedProducts;
