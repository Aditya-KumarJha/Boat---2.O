import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowLeft } from "lucide-react";

const skills = [
  { name: "Product Design", level: 85 },
  { name: "Innovation & R&D", level: 92 },
  { name: "Branding & Marketing", level: 78 },
];

const stats = [
  { label: "Years of Innovation", value: "8+" },
  { label: "Products Launched", value: "1,000+" },
  { label: "Happy Customers", value: "30M+" },
  { label: "Awards Won", value: "50+" },
];

const storySections = [
  {
    title: "Aman Gupta",
    subtitle: "Co-founder & CMO",
    image: "about/Aman Gupta.webp",
    text: `Aman Gupta is a Chartered Accountant and MBA from ISB. Before boAt, he worked at Citibank and Harman International. He saw how Indian consumers were stuck between expensive imports and unreliable local audio gear — so he built a brand that matched global quality with Indian affordability.`,
  },
  {
    title: "Sameer Mehta",
    subtitle: "Co-founder & CEO",
    image: "about/Sameer Mehta.avif",
    text: `Sameer Mehta, a commerce graduate from Mumbai, had already launched Redgear — a gaming brand. His experience in distribution helped shape boAt’s product strategy. Together, they launched boAt in 2016 under Imagine Marketing.`,
  },
  {
    title: "boAt Begins",
    subtitle: "Plug Into Nirvana",
    image: "about/BOAT.png",
    text: `boAt started with just ₹30 lakh in seed capital. Their first product? Indestructible charging cables. It clicked — stylish, affordable, durable. Soon they launched earphones, speakers, and wearables. “Plug into Nirvana” became a youth movement.`,
  },
  {
    title: "India's #1 Audio Brand",
    subtitle: "From ₹30 lakh to ₹3,000+ Cr",
    image: "about/Boat Brand.webp",
    text: `By 2023, boAt had become one of the top 5 wearable brands globally. Endorsed by IPL teams, Bollywood stars, and 4M+ ‘boAtheads’, the brand’s rise was fueled by smart marketing and loyal fans.`,
  },
];

const reviews = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      review:
        "boAt is my go-to for all things audio. Affordable and reliable! I’ve been a boAthead since 2020 and never looked back.",
    },
    {
      name: "Ravi Mehta",
      location: "Mumbai",
      review:
        "Amazing design and sound quality. Their wearables are stylish and accurate. Super happy with my smartwatch!",
    },
    {
      name: "Aisha Khan",
      location: "Bangalore",
      review:
        "Customer support is top-notch. Even my charging cable was replaced quickly. You don’t see that kind of service often.",
    },
];

const About = () => {
  const [hovered, setHovered] = useState(null);
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    const spotlight = spotlightRef.current;
    if (spotlight) {
      const { left, top } = spotlight.getBoundingClientRect();
      spotlight.style.setProperty("--x", `${e.clientX - left}px`);
      spotlight.style.setProperty("--y", `${e.clientY - top}px`);
    }
  };

  return (
    <>
      <div
        className="bg-gradient-to-b from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc] px-[4vw] lg:px-[6vw] py-[4vh] space-y-[12vh]"
        onMouseMove={handleMouseMove}
        ref={spotlightRef}
      >
        <div className="mb-[5vh] flex items-center gap-[1vw]">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-white hover:text-teal-300 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl lg:text-2xl font-semibold tracking-wide">
            About bo<span className="text-red-500">A</span>t & Founders
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-[5vw] items-center">
          <img
            src="about/Team.webp"
            alt="boAt Team"
            className="rounded-xl shadow-lg object-cover w-full max-h-[350px]"
            draggable="false"
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <h2 className="text-[2rem] md:text-[2.2rem] lg:text-[3rem] font-bold mb-[1rem]">
              We Always Make The Best
            </h2>
            <p className="text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] leading-relaxed mb-[2rem]">
              At boAt, we're not just creating audio gear – we're shaping lifestyles. With a deep
              focus on innovation, affordability, and bold design, our mission is to bring premium
              experiences to every Indian. From wearable tech to sound that moves you — we make it happen.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-[6vw]">
          <div>
            <h3 className="text-[1.5rem] lg:text-[1.8rem] font-semibold mb-[1rem]">Our Skills</h3>
            <p className="text-[0.85rem] lg:text-[0.9rem] mb-[1.5rem]">
              Our team blends creativity, tech, and strategy to build products that not only sound
              great — but stand out in the market.
            </p>
            <div className="space-y-[1rem]">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300/30 h-[0.5rem] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#f5f5dc]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.3 }}
                      viewport={{ once: false, amount: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[1.5rem]">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white/5 p-[1.5rem] rounded-lg text-center backdrop-blur-sm shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <p className="text-[1.6rem] lg:text-[2rem] font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-[0.85rem] text-[#f5f5dc]/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-[12vh]">
          {storySections.map((item, index) => {
            const isImageRight = index % 2 === 1;
            const isActive = hovered === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`flex flex-col ${
                  isImageRight ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-[2rem]`}
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  scale={1.01}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  className="rounded-3xl overflow-hidden shadow-2xl w-full lg:w-1/2 max-h-[320px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-3xl border border-teal-500/30 max-h-[320px]"
                    draggable="false"
                  />
                </Tilt>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 160 }}
                  className={`w-full lg:w-1/2 bg-[#0f172a]/60 backdrop-blur-lg border rounded-3xl p-[2rem] shadow-xl space-y-4 relative overflow-hidden transition-all duration-300 ${
                    isActive ? "border-teal-400/60" : "border-teal-400/20"
                  }`}
                >
                  <div
                    className={`spotlight pointer-events-none transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    viewport={{ once: false, amount: 0.4 }}
                    className="text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] font-bold text-teal-300"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: false, amount: 0.4 }}
                    className="text-sm text-teal-400 italic"
                  >
                    {item.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: false, amount: 0.4 }}
                    className="text-[0.95rem] md:text-[1rem] lg:text-[1.1rem] leading-relaxed text-gray-200"
                  >
                    {item.text}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-[6vh] space-y-[4vh]">
          <motion.h2
            className="text-[2rem] lg:text-[2.5rem] font-bold text-center text-[#f5f5dc]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-[2rem]">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/5 border border-teal-300/20 rounded-2xl p-[1.5rem] backdrop-blur-lg shadow-lg hover:shadow-xl transition"
              >
                <p className="text-[0.95rem] text-[#f5f5dc] mb-4 leading-relaxed italic">
                  “{review.review}”
                </p>
                <p className="text-sm text-teal-300 font-semibold">
                  {review.name}, <span className="text-teal-400 font-normal">{review.location}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-[4vh] p-[0.5rem] md:px-16 rounded-xl grid md:grid-cols-3 gap-[3vw] text-sm text-[#f5f5dc]/90">
          <div>
            <h4 className="text-[1.2rem] font-bold mb-[0.8rem] flex items-center gap-[0.5vw]">
              <img
                src="/Logo.jpg"
                alt="boAt logo"
                className="w-[1.5rem] h-[1.5rem] object-contain"
              />
              boAt
            </h4>
            <p className="text-sm leading-relaxed">
              Plug into Nirvana with India’s favorite audio & wearable brand. Innovation,
              affordability, and swag – that’s how we sail.
            </p>
          </div>

          <div className="md:px-18">
            <h5 className="font-semibold mb-[0.8rem]">Our Store</h5>
            <ul className="space-y-[0.5rem]">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/explore" className="hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <p className="hover:text-white transition">
                  Contact
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-[0.8rem]">Get In Touch</h5>
            <ul className="space-y-[0.5rem]">
              <li>📍 248 Galaxy Rise, Mumbai, MH</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ support@boat.in</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center text-sm text-[#f5f5dc]/60">
          © 2025 Boat 2.0 — All rights reserved.
        </div>
      </div>

      <style jsx="true">{`
        .spotlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            200px circle at var(--x, 50%) var(--y, 50%),
            rgba(20, 184, 166, 0.15),
            transparent 70%
          );
          pointer-events: none;
          opacity: 0;
        }
        .group:hover .spotlight {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default About;
