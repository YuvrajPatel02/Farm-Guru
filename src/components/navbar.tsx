import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/dashboard" className="text-2xl font-bold tracking-wide">
          🌾 Farm Guru
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/dashboard" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>
          
          <Link to="/" className="hover:text-yellow-300 transition">
            AI Chat
          </Link>
          <Link to="/" className="hover:text-yellow-300 transition">
            Mandi Prices
          </Link>
          <Link to="/" className="hover:text-yellow-300 transition">
            Weather
          </Link>
          <Link to="/" className="hover:text-yellow-300 transition">
            Profile
          </Link>
          <Link to="/ask" className="hover:text-yellow-300 transition">
            Experts
          </Link>
        </div>

        {/* Desktop Logout Button */}
        <div className="hidden md:block">
          <Link
            to="/"
            className="bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Logout
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-3 space-y-3">
          <Link to="/dashboard" className="block hover:text-yellow-300">
            Dashboard
          </Link>
          <Link to="/" className="block hover:text-yellow-300">
            AI Chat
          </Link>
          <Link to="/" className="block hover:text-yellow-300">
            Mandi Prices
          </Link>
          <Link to="/" className="block hover:text-yellow-300">
            Weather
          </Link>
          <Link to="/ask" className="hover:text-yellow-300 transition">
            Experts
          </Link>
          <Link to="/" className="block hover:text-yellow-300">
            Profile
          </Link>
          <Link
            to="/"
            className="block bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}
