import React from 'react';
import { motion } from 'framer-motion';
import {
    HiSpeakerWave,
    HiShieldCheck,
    HiBoltSlash,
    HiSparkles,
    HiUserGroup,
    HiGlobeAlt,
    HiStar,
    HiShoppingBag,
  } from 'react-icons/hi2';
import { Card, CardContent } from "../ui/card";
  

const features = [
    {
      icon: <HiSpeakerWave size={28} />,
      title: 'Immersive Sound',
      desc: 'Crystal-clear audio with deep bass, engineered for true audiophiles.',
    },
    {
      icon: <HiShieldCheck size={28} />,
      title: 'Built to Last',
      desc: 'Durable and stylish, crafted with premium-grade materials.',
    },
    {
      icon: <HiBoltSlash size={28} />,
      title: 'Fast Charging',
      desc: 'Get hours of playback with just a few minutes of charging.',
    },
    {
      icon: <HiSparkles size={28} />,
      title: 'Next-Gen Design',
      desc: 'Sleek, futuristic aesthetics that match your lifestyle.',
    },
  ];
  
  const stats = [
    {
      icon: <HiUserGroup size={26} />,
      value: '1M+',
      label: 'Happy Customers',
    },
    {
      icon: <HiShoppingBag size={26} />,
      value: '3M+',
      label: 'Orders Delivered',
    },
    {
      icon: <HiStar size={26} />,
      value: '500K+',
      label: '5★ Ratings',
    },
    {
      icon: <HiGlobeAlt size={26} />,
      value: 'Global',
      label: 'Shipping Available',
    },
  ];

const Stats = () => {
  return (
    <div>
       <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: "Saira Condensed" }}>
            Why bo<span className='text-red-500'>A</span>t 2.0?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium text-[#e5e5e5]">
            We've redefined what sound means — blending bold design, performance, and passion.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-between">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 120 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-left text-[#e2e8f0] shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl">
                  <CardContent className="p-6 flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#3e4ef5]/80 text-white mb-2">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-[#cbd5e1]">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-20 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((item, index) => {
            const glowClasses = [
              'shadow-[0_0_20px_#22d3ee]',
              'shadow-[0_0_20px_#e879f9]',
              'shadow-[0_0_20px_#facc15]',
              'shadow-[0_0_20px_#34d399]',
            ];

            const bgColors = [
              'bg-cyan-500',
              'bg-pink-500',
              'bg-yellow-400',
              'bg-emerald-400',
            ];

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 text-white"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full ${bgColors[index % bgColors.length]} ${glowClasses[index % glowClasses.length]} transition duration-300`}
                >
                  {item.icon}
                </div>
                <div className="text-2xl font-extrabold drop-shadow">{item.value}</div>
                <div className="text-sm text-white/80">{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  )
}

export default Stats
