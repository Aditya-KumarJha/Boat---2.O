import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import About from '../pages/About';
import ComingSoon from '../pages/ComingSoon';
import ExplorePage from '../pages/ExplorePage';
import ProductDetails from '../components/ProductDetails';
import NotFound from '../components/NotFound';
import ProtectedDashboard from '../components/ProtectedDashboard';

const AppRoutes = () => (
  <Routes>
    {/* Regular routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/about" element={<About />} />
    <Route path="/soon" element={<ComingSoon />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/dashboard" element={<ProtectedDashboard />} />

    {/* Clerk-specific routes */}
    <Route path="/signup/verify-email-address" element={<Signup />} />
    <Route path="/login/factor-one" element={<Login />} />

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
