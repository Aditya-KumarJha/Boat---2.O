import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../utils/axios';

const Highlights = () => {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div className="w-full py-12 overflow-hidden">
      <style>
        {`
          @keyframes slide-infinite {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
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
            animation: 'slide-infinite 25s linear infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {products.map((item, idx) => (
            <Link
              to={`/product/${item._id}`}
              key={`${item._id}-${idx}`}
              className="w-[80vw] sm:w-[300px] rounded-2xl border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition duration-300 p-4 flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.model}
                className="w-full h-[75%] max-h-60 object-contain mb-4"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
