import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const SSORedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(errorParam);
      return;
    }

    const fallbackURL =
      searchParams.get("sign_in_fallback_redirect_url") ||
      searchParams.get("sign_up_fallback_redirect_url") ||
      "/dashboard";

    navigate(fallbackURL, { replace: true });
  }, [location, navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-red-600">
        <h2 className="text-2xl font-bold mb-4">SSO Sign-In Failed</h2>
        <p className="text-lg">Error: {error.replace(/_/g, ' ')}</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return null;
};

const ClerkRoutes = () => (
  <Routes>
    <Route path="/signup/verify-email-address" element={<Signup />} />
    <Route path="/login/factor-one" element={<Login />} />
    <Route path="/signup/sso-callback/*" element={<SSORedirectHandler />} />
    <Route path="/login/sso-callback/*" element={<SSORedirectHandler />} />
  </Routes>
);

export default ClerkRoutes;
