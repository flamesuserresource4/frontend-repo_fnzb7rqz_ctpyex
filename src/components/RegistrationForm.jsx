import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCodes = ['+1', '+44', '+61', '+81', '+91', '+971'];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,30}$/;

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    address: '',
    customerId: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) newErrors.name = 'Customer Name is required';
    else if (form.name.length > 50) newErrors.name = 'Maximum 50 characters allowed';

    // Email
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Enter a valid email address';

    // Mobile
    if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';

    // Address
    if (!form.address.trim()) newErrors.address = 'Address is required';

    // Customer ID
    if (!form.customerId.trim()) newErrors.customerId = 'Customer ID is required';
    else if (form.customerId.length < 5 || form.customerId.length > 20)
      newErrors.customerId = 'Customer ID must be 5-20 characters';

    // Password
    if (!form.password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(form.password))
      newErrors.password = '8-30 chars, include upper, lower, number, and special character';

    // Confirm Password
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateUserId = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `USR${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userId = generateUserId();
    sessionStorage.setItem('userId', userId);
    navigate(`/acknowledgment?uid=${userId}`);
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      countryCode: '+91',
      mobile: '',
      address: '',
      customerId: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-0px)] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Customer Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="name"
              maxLength={50}
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <div className="mt-1 flex gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="w-28 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {countryCodes.map((cc) => (
                  <option key={cc} value={cc}>{cc}</option>
                ))}
              </select>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
                  setForm((prev) => ({ ...prev, mobile: val }));
                }}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10-digit number"
                inputMode="numeric"
              />
            </div>
            {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street, City, State, ZIP"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Customer ID</label>
            <input
              type="text"
              name="customerId"
              minLength={5}
              maxLength={20}
              value={form.customerId}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., johndoe123"
            />
            {errors.customerId && <p className="text-red-600 text-sm mt-1">{errors.customerId}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                maxLength={30}
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                maxLength={30}
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 focus:outline-none"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
