import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from '../pages/Dashboard';

const ProtectedDashboard = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null; 

  if (!isSignedIn) {
    return <RedirectToSignIn fallbackRedirectUrl="/login" />;
  }

  return <Dashboard />;
};

export default ProtectedDashboard;
