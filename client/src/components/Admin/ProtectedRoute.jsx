// src/components/ProtectedRoute.jsx
import React from 'react';
import { useUser, SignIn } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role = null }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-gray-300'>Loading...</p>
      </div>
    );
  }

  // If not signed in
  if (!user) {
    return <SignIn fallbackRedirectUrl="/admin" />;
  }

  // If role required and doesn't match
  const userRole = user.publicMetadata?.role;
  if (role && userRole !== role) {
    return (
      <div className='min-h-screen flex justify-center items-center text-red-500'>
        You are not authorized to access this page.
      </div>
    );
  }

  // All good
  return children;
};

export default ProtectedRoute;
