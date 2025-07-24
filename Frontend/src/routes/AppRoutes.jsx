import React from 'react';
import { Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import ComingSoon from '../pages/ComingSoon';
import ExplorePage from '../pages/ExplorePage';

const AppRoutes = () => [
  <Route key="/" path="/" element={<HomePage />} />,
  <Route key="/login" path="/login" element={<Login />} />,
  <Route key="/signup" path="/signup" element={<Signup />} />,
  <Route key="/about" path="/about" element={<About />} />,
  <Route key="/soon" path="/soon" element={<ComingSoon />} />,
  <Route key="/explore" path="/explore" element={<ExplorePage />} />,
  <Route
    key="/dashboard"
    path="/dashboard"
    element={
      <>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    }
  />
];

export default AppRoutes;
