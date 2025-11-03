import React from 'react';
import { Routes, Route, Navigate, useLocation, Link, Outlet } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import DummyPage from './components/DummyPage';
import Navbar from './components/Navbar';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function AcknowledgmentPage() {
  const query = useQuery();
  const uid = query.get('uid') || `USR${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-emerald-700">Customer Registration successful.</h2>
        <p className="mt-4 text-gray-700">Your User ID</p>
        <div className="mt-2 text-3xl font-extrabold text-gray-900">{uid}</div>
        <Link
          to="/login"
          className="mt-8 inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

function DashboardLayout() {
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : 'Guest';

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userId={userId} onLogout={handleLogout} />
      <Outlet />
    </div>
  );
}

function HomePage() {
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : 'Guest';
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {userId || 'Guest'}</h1>
        <p className="mt-3 text-gray-600">Use the navigation bar to explore reservations, billing, history, room status, bookings, and support.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/acknowledgment" element={<AcknowledgmentPage />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="reservation" element={<DummyPage title="Reservation" />} />
        <Route path="billing" element={<DummyPage title="Billing" />} />
        <Route path="history" element={<DummyPage title="History" />} />
        <Route path="room-status" element={<DummyPage title="Room Status" />} />
        <Route path="bookings" element={<DummyPage title="Bookings" />} />
        <Route path="contact-support" element={<DummyPage title="Contact Support" />} />
      </Route>

      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;
