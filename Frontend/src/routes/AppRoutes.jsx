import React from 'react';
import { Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';

const AppRoutes = () => [
  <Route key="/" path="/" element={<HomePage />} />,
  <Route key="/login" path="/login" element={<Login />} />,
  <Route key="/signup" path="/signup" element={<Signup />} />,
  <Route key="/about" path="/about" element={<About />} />,
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
