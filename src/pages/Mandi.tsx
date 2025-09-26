import { useState } from "react";
import MandiLive from "../components/MandiCall";
import Navbar from "@/components/navbar";

function Mandi() {
  const [language, setLanguage] = useState<"en" | "ml">("en");

  // Translations for the Mandi page
  const translations = {
    en: {
      title: "Farmer Query Portal",
      description:
        "Get real-time mandi prices from across India. Search for specific crops, sort by price, and stay updated with the latest market rates.",
    },
    ml: {
      title: "കർഷക ചോദ്യ പോർട്ടൽ",
      description:
        "ഇന്ത്യയിലെ വിവിധ ഭാഗങ്ങളിൽ നിന്നുള്ള തത്സമയ മണ്ടി വിലകൾ നേടുക. നിർദ്ദിഷ്ട വിളകൾക്കായി തിരയുക, വില പ്രകാരം വർഗ്ഗീകരിക്കുക, ഏറ്റവും പുതിയ മാർക്കറ്റ് നിരക്കുകൾക്കൊപ്പം തുടരുക.",
    },
  };

  const t = translations[language];

  return (
    <>
      {/* Navbar with language toggle */}
      <Navbar language={language} setLanguage={setLanguage} />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              {t.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.description}</p>
          </div>

          {/* MandiLive Component */}
          <MandiLive
            apiKey="579b464db66ec23bdd00000123283405d9f249db7fadfb7aef357f18"
            refreshInterval={5 * 60 * 1000}
            language={language}
          />
        </div>
      </div>
    </>
  );
}

export default Mandi;
