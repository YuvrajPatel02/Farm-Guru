// components/Navbar.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface NavbarProps {
  language: "en" | "ml";
  setLanguage: (language: "en" | "ml") => void;
}

const navbarTranslations = {
  en: {
    aiChat: "AI Chat",
    mandiPrices: "Mandi Prices",
    weather: "Weather",
    experts: "Experts",
    home: "Home",
    dashboard: "Dashboard",
    cropReco: "Crop Recommendation",
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
    cropReco: "കൃഷി ശുപാർശ",
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
    const newLanguage = language === "en" ? "ml" : "en";
    setLanguage(newLanguage);
    // Optional: Persist to localStorage for cross-session memory
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return (
    <nav className="bg-green-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold tracking-wide">
          🌾 KarshakaMithram
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/ai">{t.aiChat}</Link>
          <Link to="/mandi">{t.mandiPrices}</Link>
          <Link to="/weather">{t.weather}</Link>
          <Link to="/ask">{t.experts}</Link>
          <Link to="/reco">{t.cropReco}</Link>
          <Link to="/home">{t.home}</Link>

          <button onClick={toggleLanguage} className="bg-green-700 px-3 py-1 rounded hover:bg-green-600 transition-colors">
            {t.switchToMalayalam}
          </button>

          <button onClick={handleLogout} className="bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-300 transition-colors">
            {t.logout}
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleLanguage} className="bg-green-700 px-3 py-1 rounded hover:bg-green-600 transition-colors">
            {t.switchToMalayalam}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-green-800 px-4 py-3 space-y-3">
          <Link to="/home" className="block py-2">{t.home}</Link>
          <Link to="/ai" className="block py-2">{t.aiChat}</Link>
          <Link to="/mandi" className="block py-2">{t.mandiPrices}</Link>
          <Link to="/weather" className="block py-2">{t.weather}</Link>
          <Link to="/ask" className="block py-2">{t.experts}</Link>
          <Link to="/reco" className="block py-2">{t.cropReco}</Link>

          <button onClick={toggleLanguage} className="block bg-green-700 px-3 py-2 rounded w-full text-left hover:bg-green-600 transition-colors">
            {t.switchToMalayalam}
          </button>
          <button onClick={handleLogout} className="block bg-yellow-400 text-green-900 px-4 py-2 rounded w-full text-left hover:bg-yellow-300 transition-colors">
            {t.logout}
          </button>
        </div>
      )}
    </nav>
  );
}