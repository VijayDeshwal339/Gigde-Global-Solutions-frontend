import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/auth/authSlice';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsSidebarOpen(false);
  };

  return (
    <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">Task Tracker</Link>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="focus:outline-none hover:text-blue-300 transition"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-300 font-medium transition">Login</Link>
              <Link
                to="/signup"
                className="bg-white text-blue-700 px-4 py-2 rounded-md font-semibold hover:bg-blue-100 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/projects" className="hover:text-blue-300 font-medium transition">Projects</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md text-gray-800 p-6 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-700">Task Tracker</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-red-500"
          >
            <X size={28} />
          </button>
        </div>
        <div className="space-y-4">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsSidebarOpen(false)}
                className="block text-lg font-medium hover:text-blue-500 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsSidebarOpen(false)}
                className="block bg-blue-700 text-white px-4 py-2 rounded-md text-center font-semibold hover:bg-blue-800 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/projects"
                onClick={() => setIsSidebarOpen(false)}
                className="block text-lg font-medium hover:text-blue-500 transition"
              >
                Projects
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
        />
      )}
    </header>
  );
};

export default Header;
