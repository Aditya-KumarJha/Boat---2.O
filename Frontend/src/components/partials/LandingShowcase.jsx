import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import instance from '../../utils/axios';
import { Link } from 'react-router-dom';
import { Truck, Undo2, ShieldCheck } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-creative';

const isTouchDevice = () => {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
};

const LandingShowcase = () => {
  const [products, setProducts] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchPlayMap, setTouchPlayMap] = useState({});
  const swiperRef = useRef(null);

  const videoMap = {
    301: 'landingShowcase/WirelessSpeaker.mp4',
    302: 'landingShowcase/NeckBand.mp4',
    303: 'landingShowcase/EarBuds.mp4',
    304: 'landingShowcase/HeadPhone.mp4',
    305: 'landingShowcase/Watch.mp4'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const heroProducts = useMemo(() => {
    return products
      .filter(p => p.id >= 301 && p.id <= 305)
      .sort((a, b) => a.id - b.id);
  }, [products]);

  const isTouch = isTouchDevice();

  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;

    const isVideoPlayingDesktop = hoveredIndex !== null;
    const isVideoPlayingTouch = touchPlayMap[activeIndex];

    if ((isTouch && isVideoPlayingTouch) || (!isTouch && isVideoPlayingDesktop)) {
      autoplay.stop();
    } else {
      autoplay.start();
    }
  }, [hoveredIndex, touchPlayMap, activeIndex]);

  const toggleTouchPlay = (index) => {
    setTouchPlayMap(prev => {
      const updated = { ...prev, [index]: !prev[index] };
      return updated;
    });
  };

  return (
    <>
      {heroProducts.length >= 2 && (
        <section className="w-full px-6 py-6 md:px-12 md:py-12 lg:h-[70vh]">
          <Swiper
            modules={[Autoplay, EffectCreative]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            effect="creative"
            creativeEffect={{
              prev: { shadow: true, translate: [0, 0, -400] },
              next: { translate: ['100%', 0, 0] }
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full rounded-2xl overflow-hidden"
          >
            {heroProducts.map((product, index) => {
              const shouldShowVideo = isTouch
                ? touchPlayMap[index] && activeIndex === index
                : hoveredIndex === index && activeIndex === index;

              return (
                <SwiperSlide
                  key={product._id}
                  className="!rounded-2xl !overflow-hidden transition-all duration-300"
                >
                  <div
                    onPointerEnter={() => !isTouch && setHoveredIndex(index)}
                    onPointerLeave={() => !isTouch && setHoveredIndex(null)}
                    onClick={() => isTouch && toggleTouchPlay(index)}
                    className="w-full h-full flex flex-col md:flex-row bg-[#f5f5dc] text-[#0f172a] cursor-pointer rounded-2xl overflow-hidden"
                  >
                    <div className="w-full md:w-[60%] flex flex-col justify-center items-start p-6 md:p-12 z-10">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "Saira Condensed", fontWeight: 900 }}>Best Collection</h1>
                      <p className="text-xl lg:text-2xl mb-6 max-w-xl line-clamp-2" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>{product.title}</p>
                      <Link
                        to="/explore"
                        className="bg-[#3e4ef5] text-white px-6 py-2 rounded-full font-semibold w-max hover:opacity-90"
                      >
                        Shop Now
                      </Link>
                    </div>

                    <div className="relative w-full md:w-[60%] h-[300px] md:h-[400px] lg:h-full overflow-hidden rounded-2xl">
                      <AnimatePresence mode="wait">
                        {shouldShowVideo ? (
                          <motion.video
                            key="video"
                            src={videoMap[product.id]}
                            autoPlay
                            muted
                            loop
                            playsInline
                            initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                            animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
                            exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <motion.img
                            key="image"
                            src={product.image}
                            alt={product.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="w-full h-full object-top"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 text-center">
        {[
          {
            Icon: Truck,
            title: 'Free Shipping',
            desc: 'On all orders above ₹499',
            duration: 2
          },
          {
            Icon: Undo2,
            title: '7 Days Return',
            desc: 'Easy return within 7 days',
            duration: 2.5
          },
          {
            Icon: ShieldCheck,
            title: '100% Secure Payment',
            desc: 'Trusted & encrypted checkout',
            duration: 3
          }
        ].map(({ Icon, title, desc, duration }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration }}
            className="flex flex-col items-center"
          >
            <Icon className="w-10 h-10 mb-3 text-[#f5f5dc]/90" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-[#f5f5dc]/80">{desc}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default LandingShowcase;
