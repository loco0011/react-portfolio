import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [, setLocation] = useLocation();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin' && password === 'admin') {
      setAuthenticated(true);
      toast.success('Welcome back, Admin!');
      setLocation('/admin/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}