import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import Dropdown from '../components/partials/Dropdown';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import HighlightedProducts from '../components/partials/HighlightedProducts';
import AllProducts from '../components/partials/AllProducts';

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bannerImages = [
    'banner/Banner1.webp',
    'banner/Banner2.jpg',
    'banner/Banner3.png',
    'banner/Banner4.jpg',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc]">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <Link
          to="/"
          className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-teal-300 transition"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="relative flex-grow max-w-xl w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-white/60" size={18} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search anything..."
            className="w-full pl-10 pr-10 py-2.5 text-white text-base border border-white/50 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white transition"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <Dropdown
          title="Sort by"
          options={[
            'Price - Low to High',
            'Price - High to Low',
            'Newest',
            'Top Rated',
          ]}
          func={(e) => console.log('Sort:', e.target.value)}
        />
      </div>

      <div className="p-6 mt-6 w-full h-[60vh] overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {bannerImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-fill object-center rounded-xl shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <HighlightedProducts />
      <AllProducts />

        <div className="flex justify-center text-sm text-[#f5f5dc]/60">
          © 2025 Boat 2.0 — All rights reserved.
        </div>
    </div>
  );
};

export default ExplorePage;
