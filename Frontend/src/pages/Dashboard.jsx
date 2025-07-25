import React, { useEffect } from 'react';
import { useClerk, useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import instance from '../utils/axios';

const Dashboard = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      try {
        const token = await getToken();

        await instance.post(
          '/api/sync-user',
          {
            externalId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            profileImage: user.imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('✅ Synced user to backend');
      } catch (error) {
        console.error('❌ Failed to sync user:', error);
      }
    };

    syncUser();
  }, [isLoaded, user, getToken]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc] px-[4vw] lg:px-[6vw] py-[4vh] space-y-[12vh]">
      <div className="flex items-center justify-between mb-10">
        <Link
          to="/"
          className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-teal-300 transition"
        >
          <ArrowLeft size={24} />
        </Link>

        <div className="flex items-center space-x-4">
          <img
            src={user?.imageUrl || '/avtar.webp'}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
            draggable={false}
          />
          <h2 className="text-lg font-semibold">
            Welcome, {user?.username || 'User'}
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-base font-semibold border-2 border-red-500 text-red-500 rounded-full relative overflow-hidden group flex items-center space-x-2"
        >
          <span className="relative z-20 group-hover:text-black transition-all duration-300 flex items-center space-x-2">
            <LogOut size={18} />
            <span>Logout</span>
          </span>
          <span className="absolute inset-0 flex justify-center items-center z-0">
            <span className="h-10 w-10 bg-red-500 rounded-full scale-0 group-hover:scale-[3.5] transition-transform duration-500 ease-out" />
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow space-y-6">
        <h1 className="text-5xl font-bold">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
