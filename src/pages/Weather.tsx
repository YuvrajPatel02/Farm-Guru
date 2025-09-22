import { useState } from "react";
import Navbar from "@/components/navbar";
import WeatherLive from "../components/Weathercall";

function WeatherPage() {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  
  // Translations for the Weather page
  const translations = {
    en: {
      title: "🌤️ Live Weather Dashboard",
      description: "Get real-time weather updates and forecasts for your current location. Allow location access to see your local weather instantly.",
      tipsTitle: "Weather Tips & Info",
      tipsDescription: "Use this dashboard to track temperature, wind, precipitation, UV index, and a 5-day forecast. Stay safe and plan your day!",
      sunny: "☀️ Sunny",
      rainy: "🌧️ Rainy",
      partlyCloudy: "🌤️ Partly Cloudy",
      stormy: "⛈️ Stormy",
      snowy: "❄️ Snowy",
      footer: "For our Farmers..."
    },
    ml: {
      title: "🌤️ തത്സമയ കാലാവസ്ഥ ഡാഷ്ബോർഡ്",
      description: "നിങ്ങളുടെ നിലവിലെ സ്ഥാനത്തിനായി തത്സമയ കാലാവസ്ഥ അപ്ഡേറ്റുകളും പ്രവചനങ്ങളും നേടുക. നിങ്ങളുടെ പ്രാദേശിക കാലാവസ്ഥ ഉടനടി കാണുന്നതിന് ലൊക്കേഷൻ ആക്സസ് അനുവദിക്കുക.",
      tipsTitle: "കാലാവസ്ഥ ടിപ്പുകളും വിവരങ്ങളും",
      tipsDescription: "താപനില, കാറ്റ്, മഴ, യുവി സൂചിക, 5-ദിവസത്തെ പ്രവചനം എന്നിവ ട്രാക്ക് ചെയ്യുന്നതിന് ഈ ഡാഷ്ബോർഡ് ഉപയോഗിക്കുക. സുരക്ഷിതരായിരിക്കുകയും നിങ്ങളുടെ ദിവസം ആസൂത്രണം ചെയ്യുകയും ചെയ്യുക!",
      sunny: "☀️ വെയിലോടെ",
      rainy: "🌧️ മഴ",
      partlyCloudy: "🌤️ ഭാഗികമായി മേഘാവൃതം",
      stormy: "⛈️ കൊടുങ്കാറ്റ്",
      snowy: "❄️ മഞ്ഞുവീഴ്ച",
      footer: "നമ്മുടെ കർഷകർക്കായി..."
    }
  };
  
  const t = translations[language];

  return (
    <>
      {/* Pass language and setLanguage as props to Navbar */}
      <Navbar language={language} setLanguage={setLanguage} />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12">
        <div className="container mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
              {t.title}
            </h1>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* WeatherLive Component */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <WeatherLive language={language} />
          </div>

          {/* Info / Tips Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.tipsTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              {t.tipsDescription}
            </p>
            <div className="flex justify-center space-x-6 flex-wrap">
              <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">{t.sunny}</span>
              <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">{t.rainy}</span>
              <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">{t.partlyCloudy}</span>
              <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">{t.stormy}</span>
              <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">{t.snowy}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            {t.footer}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherPage;