import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from '../pages/Dashboard';

const ProtectedDashboard = () => {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
      <RedirectToSignIn fallbackRedirectUrl="/login" />
      </SignedOut>
    </>
  );
};

export default ProtectedDashboard;
