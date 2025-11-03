import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,30}$/;

export default function LoginForm() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!userId.trim()) newErrors.userId = 'User ID is required';
    else if (userId.length < 5 || userId.length > 20) newErrors.userId = 'User ID must be 5-20 characters';

    if (!password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(password)) newErrors.password = '8-30 chars, include upper, lower, number, and special character';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    sessionStorage.setItem('userId', userId);
    alert('Login Successful');
    navigate('/dashboard/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Customer Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              minLength={5}
              maxLength={20}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your User ID"
            />
            {errors.userId && <p className="text-red-600 text-sm mt-1">{errors.userId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={30}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Link to="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
