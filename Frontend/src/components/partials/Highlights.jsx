import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../utils/axios';
import { useUserContext } from '../../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const Highlights = () => {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarked, setBookmarked] = useState({});
  const { backendUser, isSignedIn } = useUserContext();

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const { data } = await instance.get('/api/products');

        const getRandomItems = (type) => {
          const items = data.filter((p) => p.type?.toLowerCase() === type);
          const shuffled = items.sort(() => 0.5 - Math.random());
          return shuffled.slice(0, 3);
        };

        const headphoneItems = getRandomItems('headphone');
        const earbudItems = getRandomItems('earbuds');
        const neckbandItems = getRandomItems('neckband');
        const earphoneItems = getRandomItems('earphone');

        const combined = [
          ...headphoneItems,
          ...earbudItems,
          ...neckbandItems,
          ...earphoneItems,
        ];

        setProducts([...combined, ...combined]);
      } catch (error) {
        console.error('Failed to fetch highlights:', error);
      }
    };

    fetchHighlights();
  }, []);

  useEffect(() => {
    if (backendUser?.savedItems) {
      const initialBookmarks = {};
      backendUser.savedItems.forEach((item) => {
        initialBookmarks[item.productId] = true;
      });
      setBookmarked(initialBookmarks);
    }    
  }, [backendUser]);

  const handleBookmark = async (productId) => {
    if (!isSignedIn) {
      toast.info('Login to bookmark', { autoClose: 2000 });
      return;
    }
    
    if (!backendUser || !backendUser.email) {
      toast.info('User data loading... please wait', { autoClose: 2000 });
      return;
    }

    try {
      const wasBookmarked = bookmarked[productId];

      await instance.post('/api/user/collection', {
        email: backendUser.email,
        productId,
      });

      setBookmarked((prev) => ({
        ...prev,
        [productId]: !wasBookmarked,
      }));

      toast.success(
        wasBookmarked ? 'Bookmark removed' : 'Bookmark added',
        { autoClose: 2000 }
      );
    } catch (err) {
      console.error('Bookmark error:', err);
      toast.error('Something went wrong', { autoClose: 2000 });
    }
  };

  return (
    <div className="w-full py-12 overflow-hidden">
      <ToastContainer position="top-center" theme="dark" />
      <style>
        {`
          @keyframes slide-infinite {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <h2
        className="text-white text-3xl font-bold text-center mb-8"
        style={{ fontFamily: 'Manrope', fontWeight: 900 }}
      >
        🔥 What Everyone's Loving Right Now
      </h2>

      <div
        className="relative rounded-xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex w-fit gap-6 py-4"
          style={{
            animation: 'slide-infinite 40s linear infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {products.map((item, idx) => (
            <div
              key={`${item._id}-${idx}`}
              className="relative w-[80vw] sm:w-[300px] rounded-2xl border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition duration-300 p-4 flex-shrink-0 bg-transparent"
            >
              <button
                onClick={() => handleBookmark(item._id)}
                className="absolute top-5 right-6 z-10 text-white hover:scale-110 transition p-1 bg-black/50 rounded-full border border-[#FFD700]"
                title="Bookmark"
              >
                {bookmarked[item._id] ? (
                  <BookmarkCheck size={20} className="text-[#FFD700]" />
                ) : (
                  <Bookmark size={20} className="text-white" />
                )}
              </button>

              <Link to={`/product/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.model}
                  className="w-full h-[75%] max-h-60 object-fill mb-4"
                />
                <div className="text-white text-sm space-y-1 text-left line-clamp-3">
                  <p className="text-gray-200">
                    <span className="font-bold">Brand:</span> {item.brand}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-bold">Model:</span>{' '}
                    {item.model.length > 50 ? item.model.slice(0, 50) + '...' : item.model}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-bold">Color:</span> {item.color}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
