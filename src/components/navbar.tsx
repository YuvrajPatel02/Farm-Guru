import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Define types for the props
interface NavbarProps {
  language: "en" | "ml";
  setLanguage: (language: "en" | "ml") => void;
}

// Define translations for navbar items
const navbarTranslations = {
  en: {
    aiChat: "AI Chat",
    mandiPrices: "Mandi Prices",
    weather: "Weather",
    experts: "Experts",
    home: "Home",
    dashboard: "Dashboard",
    logout: "Logout",
    switchToMalayalam: "മലയാളം",
  },
  ml: {
    aiChat: "എഐ ചാറ്റ്",
    mandiPrices: "മണ്ടി വിലകൾ",
    weather: "കാലാവസ്ഥ",
    experts: "വിദഗ്ധർ",
    home: "ഹോം",
    dashboard: "ഡാഷ്ബോർഡ്",
    logout: "ലോഗൗട്ട്",
    switchToMalayalam: "English",
  },
};

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const t = navbarTranslations[language];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  return (
    <nav className="bg-green-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold tracking-wide">
          🌾 KarshakaMithram
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/ai" className="hover:text-yellow-300 transition">
            {t.aiChat}
          </Link>
          <Link to="/mandi" className="hover:text-yellow-300 transition">
            {t.mandiPrices}
          </Link>
          <Link to="/weather" className="hover:text-yellow-300 transition">
            {t.weather}
          </Link>
          <Link to="/ask" className="hover:text-yellow-300 transition">
            {t.experts}
          </Link>
          <Link to="/" className="hover:text-yellow-300 transition">
            {t.home}
          </Link>
          
          {/* Language toggle button */}
          <button
            onClick={toggleLanguage}
            className="text-sm bg-green-700 hover:bg-green-600 px-3 py-1 rounded-md transition"
          >
            {t.switchToMalayalam}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            {t.logout}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          {/* Language toggle button for mobile (visible when menu is closed) */}
          <button
            onClick={toggleLanguage}
            className="text-sm bg-green-700 hover:bg-green-600 px-3 py-1 rounded-md transition"
          >
            {t.switchToMalayalam}
          </button>
          
          <button
            className="focus:outline-none"
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
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-3 space-y-3">
          <Link to="/dashboard" className="block hover:text-yellow-300">
            {t.dashboard}
          </Link>
          <Link to="/ai" className="block hover:text-yellow-300">
            {t.aiChat}
          </Link>
          <Link to="/mandi" className="block hover:text-yellow-300">
            {t.mandiPrices}
          </Link>
          <Link to="/weather" className="block hover:text-yellow-300">
            {t.weather}
          </Link>
          <Link to="/ask" className="hover:text-yellow-300 transition">
            {t.experts}
          </Link>
          <Link to="/" className="block hover:text-yellow-300">
            {t.home}
          </Link>
          
          {/* Language toggle in mobile menu */}
          <button
            onClick={toggleLanguage}
            className="block text-sm bg-green-700 hover:bg-green-600 px-3 py-1 rounded-md transition w-full text-left"
          >
            {t.switchToMalayalam}
          </button>
          
          <button
            onClick={handleLogout}
            className="block bg-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition w-full text-left"
          >
            {t.logout}
          </button>
        </div>
      )}
    </nav>
  );
}