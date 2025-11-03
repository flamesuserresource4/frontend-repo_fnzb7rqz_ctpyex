import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/dashboard/home', label: 'Home' },
  { to: '/dashboard/reservation', label: 'Reservation' },
  { to: '/dashboard/billing', label: 'Billing Page' },
  { to: '/dashboard/history', label: 'History' },
  { to: '/dashboard/room-status', label: 'Room Status' },
  { to: '/dashboard/bookings', label: 'Bookings' },
  { to: '/dashboard/contact-support', label: 'Contact Support' },
];

export default function Navbar({ userId, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-blue-600 text-white grid place-items-center font-bold">H</div>
            <span className="text-lg font-semibold text-gray-800">Hotel Manager</span>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </nav>

          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                Menu
              </summary>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 p-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-medium ${
                        isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full mt-1 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </details>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm text-blue-900">
          Welcome, <span className="font-semibold">{userId || 'Guest'}</span>
        </div>
      </div>
    </header>
  );
}
