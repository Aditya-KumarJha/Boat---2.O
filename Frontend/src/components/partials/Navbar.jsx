import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/context/userContext";
import { useClerk } from "@clerk/clerk-react";

const navItems = [
  { name: "Explore", href: "/explore", icon: "ri-compass-3-line" },
  { name: "Coming Soon", href: "/soon", icon: "ri-time-line" },
  { name: "About", href: "/about", icon: "ri-information-line" },
  { name: "Contact Us", href: "/contact", icon: "ri-contacts-line" },
  { name: "Dashboard", href: "/dashboard", icon: "ri-dashboard-line" },
];

const NavBar = ({ onContactClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUserContext();
  const { signOut } = useClerk();

  const handleNavClick = (e, item) => {
    if (item.href === "/contact" && typeof onContactClick === "function") {
      e.preventDefault();
      onContactClick();
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="top-0 w-full z-50 text-[#e0f2f1] shadow-md"
    >
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-[#f5f5dc] text-[1.75rem] font-extrabold tracking-widest">
            🎧 bo<span className="text-red-500">A</span>t 2.0
          </h1>
        </div>

        <div className="hidden lg:flex space-x-[2.5rem] text-[1.2rem] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "relative flex items-center gap-2 group transition-all duration-300 px-3 py-1.5 rounded-xl",
                location.pathname === item.href
                  ? "text-[#f5f5dc] border border-[#22d3ee] bg-[#0d948820]"
                  : "text-[#e0f2f1] hover:text-[#ccfbf1] hover:scale-105 hover:bg-[#0d948810] hover:border hover:border-[#22d3ee]"
              )}
            >
              <i className={`${item.icon} text-[1.25rem]`} />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden md:flex items-center gap-[1rem]">
            {!isSignedIn ? (
              <>
                <Link to="/login">
                  <button className="px-[1.25rem] py-[0.625rem] text-[1rem] font-semibold border-2 border-lime-400 text-lime-400 rounded-full relative overflow-hidden group">
                    <span className="relative z-20 group-hover:text-black transition-all duration-300">
                      Login
                    </span>
                    <span className="absolute inset-0 flex justify-center items-center z-0">
                      <span className="h-[3rem] w-[3rem] bg-[#a3e635] rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out" />
                    </span>
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-[1.25rem] py-[0.625rem] text-[1rem] font-semibold border-2 border-[#f472b6] text-[#f472b6] rounded-full relative overflow-hidden group">
                    <span className="relative z-20 group-hover:text-black transition-all duration-300">
                      Signup
                    </span>
                    <span className="absolute inset-0 flex justify-center items-center z-0">
                      <span className="h-[3rem] w-[3rem] bg-[#f472b6] rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out" />
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-[1.25rem] py-[0.625rem] text-[1rem] font-semibold border-2 border-red-400 text-red-400 rounded-full relative overflow-hidden group flex items-center gap-2"
              >
                <span className="relative z-20 group-hover:text-black transition-all duration-300 flex items-center gap-2">
                  <LogOut size={18} />
                  Logout
                </span>
                <span className="absolute inset-0 flex justify-center items-center z-0">
                  <span className="h-[3rem] w-[3rem] bg-red-400 rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out" />
                </span>
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-[#e0f2f1] hover:bg-[#0d948820] transition"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden px-6 pb-4 space-y-3 bg-[#0d948880] backdrop-blur-md border-t border-[#22d3ee33]"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "block py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 group",
                  location.pathname === item.href
                    ? "text-[#f5f5dc] bg-[#0d948820] border border-[#22d3ee]"
                    : "text-[#e0f2f1] hover:text-[#ccfbf1] hover:scale-105 hover:bg-[#0d948810] hover:border hover:border-[#22d3ee]"
                )}
              >
                <i className={`${item.icon} mr-2 group-hover:animate-bounce`} />
                {item.name}
              </Link>
            ))}

            <div className="block md:hidden pt-2">
              {!isSignedIn ? (
                <div className="flex flex-row flex-wrap gap-3 justify-between">
                  <Link to="/login" className="flex-1 min-w-[45%]">
                    <button className="w-full px-4 py-2 text-base font-semibold border-2 border-[#22d3ee] text-[#22d3ee] rounded-full relative overflow-hidden group">
                      <span className="relative z-20 group-hover:text-black transition-all duration-300">
                        Login
                      </span>
                      <span className="absolute inset-0 flex justify-center items-center z-0">
                        <span className="h-10 w-10 bg-[#22d3ee] rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out" />
                      </span>
                    </button>
                  </Link>

                  <Link to="/signup" className="flex-1 min-w-[45%]">
                    <button className="w-full px-4 py-2 text-base font-semibold border-2 border-[#f472b6] text-[#f472b6] rounded-full relative overflow-hidden group">
                      <span className="relative z-20 group-hover:text-black transition-all duration-300">
                        Signup
                      </span>
                      <span className="absolute inset-0 flex justify-center items-center z-0">
                        <span className="h-10 w-10 bg-[#f472b6] rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out" />
                      </span>
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full mt-3 px-4 py-2 text-base font-semibold border-2 border-red-400 text-red-400 rounded-full relative overflow-hidden group flex items-center justify-center gap-2"
                >
                  <span className="relative z-20 group-hover:text-black transition-all duration-300 flex items-center gap-2">
                    <LogOut size={18} />
                    Logout
                  </span>
                  <span className="absolute inset-0 flex justify-center items-center z-0">
                    <span className="h-10 w-10 bg-red-400 rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-500 ease-out" />
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
