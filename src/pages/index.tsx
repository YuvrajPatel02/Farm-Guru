import { useState } from "react";
import Navbar from "@/components/navbar";
import { Link } from "react-router-dom";

const translations = {
  en: {
    welcomeTitle: "🌾 Welcome to Karshaka Mithram",
    welcomeDesc:
      "Your personalized farming assistant for Kerala farmers. Explore crop recommendations, mandi prices, weather updates, and expert advice to empower your farming.",
    exploreNow: "Explore Now",
    aboutTitle: "About Farmers in Kerala",
    aboutParagraphs: [
      "Kerala is home to thousands of small and medium-scale farmers who cultivate rice, coconut, rubber, spices, and vegetables. Farming sustains livelihoods and preserves cultural heritage.",
      "Farmers face challenges like unpredictable rainfall, pest attacks, and fluctuating market prices. Karshaka Mithram aims to provide actionable insights to make their work easier and more profitable.",
      "By leveraging technology, farmers can increase yield, reduce losses, and contribute to sustainable agriculture."
    ],
    featuresTitle: "Our Features",
    features: [
      { title: "🌾 Crop Recommendations", desc: "Get personalized crop suggestions based on your land and climate.", link: "/reco" },
      { title: "💬 Ask Experts", desc: "Consult with agricultural experts for guidance and advice.", link: "/ask" },
      { title: "📊 Mandi Prices", desc: "Check today's crop prices in Kerala markets.", link: "/mandi" },
      { title: "🌦 Weather Updates", desc: "Stay informed with rainfall, temperature, and farming alerts.", link: "/weather" },
    ],
    quotesTitle: "Words of Wisdom",
    quotes: [
      `"The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways." – John F. Kennedy`,
      `"Farming is a profession of hope." – Brian Brett`,
      `"Agriculture is the backbone of Kerala's economy, supporting millions of lives."`
    ],
    statsTitle: "Did You Know?",
    stats: [
      "Over 60% of Kerala’s rural population is engaged in agriculture.",
      "Kerala contributes significantly to India's coconut and spice production.",
      "Small-scale farms dominate, with average farm size under 2 hectares."
    ],
    footer: "© 2025 Karshaka Mithram - Supporting Kerala Farmers",
    switchToMalayalam: "മലയാളത്തിലേക്ക് മാറുക",
    switchToEnglish: "Switch to English",
  },
  ml: {
    welcomeTitle: "🌾 കർഷക മിത്രത്തിലേക്ക് സ്വാഗതം",
    welcomeDesc:
      "കേരളത്തിലെ കർഷകർക്ക് വേണ്ടി രൂപകൽപ്പന ചെയ്ത നിങ്ങളുടെ വ്യക്തിഗത കൃഷി സഹായി. വിളവുകൾ ശുപാർശ ചെയ്യുക, മണ്ടി വിലകൾ അറിയുക, കാലാവസ്ഥയും വിദഗ്ധരുടെയും നിർദ്ദേശങ്ങളും ലഭിക്കുക.",
    exploreNow: "ഇപ്പോൾ അന്വേഷിക്കുക",
    aboutTitle: "കേരളത്തിലെ കർഷകർക്ക് കുറിച്ച്",
    aboutParagraphs: [
      "കേരളത്തിൽ അനവധി ചെറുകിട, മധ്യവലുപ്പ കർഷകർ അരി, തേങ്ങ, റബ്ബർ, മസാലകൾ, പച്ചക്കറികൾ തുടങ്ങിയ വിളകൾ കൃഷി ചെയ്യുന്നു. കൃഷി ജീവിതോപാധികൾ നിലനിർത്തുകയും സാംസ്കാരിക പൈതൃകം സംരക്ഷിക്കുകയും ചെയ്യുന്നു.",
      "കർഷകർക്ക് മഴക്കാലം അനിശ്ചിതത്വം, കീടങ്ങൾ, വിപണി വില വ്യത്യാസങ്ങൾ പോലുള്ള വെല്ലുവിളികൾ നേരിടുന്നു. കർഷക മിത്രം അവരുടെ ജോലി എളുപ്പമാക്കാനും ലാഭകരമാക്കാനും സഹായിക്കുന്നു.",
      "സാങ്കേതിക വിദ്യ ഉപയോഗിച്ച് കർഷകർ വിളവെടുപ്പ് വർദ്ധിപ്പിക്കുകയും നഷ്ടങ്ങൾ കുറയ്ക്കുകയും സുസ്ഥിര കൃഷിയിൽ സംഭാവന നൽകുകയും ചെയ്യുന്നു."
    ],
    featuresTitle: "നമ്മുടെ സവിശേഷതകൾ",
    features: [
      { title: "🌾 വിള ശുപാർശകൾ", desc: "നിങ്ങളുടെ ഭൂമി, കാലാവസ്ഥ അടിസ്ഥാനമാക്കി വ്യക്തിഗത ശുപാർശകൾ.", link: "/reco" },
      { title: "💬 വിദഗ്ധരോട് ചോദിക്കുക", desc: "കൃഷി വിദഗ്ധരിൽ നിന്നും മാർഗനിർദ്ദേശങ്ങൾ നേടുക.", link: "/ask" },
      { title: "📊 മണ്ടി വിലകൾ", desc: "കേരളത്തിലെ വിപണികളിലെ ഇന്നത്തെ വിളവിന്റെ വിലകൾ പരിശോധിക്കുക.", link: "/mandi" },
      { title: "🌦 കാലാവസ്ഥ അറിയിപ്പുകൾ", desc: "മഴ, താപനില, കൃഷി മുന്നറിയിപ്പുകൾ ലഭിക്കുക.", link: "/weather" },
    ],
    quotesTitle: "പ്രശസ്തമായ വാക്കുകൾ",
    quotes: [
      `"എല്ലാം റീട്ടെയിൽ വാങ്ങി, എല്ലാം ഹോൾസെയിൽ വിറ്റു, ഫ്രീറ്റ് രണ്ടുവഴിയും അടയ്ക്കുന്ന ഏകവ്യക്തി കർഷകനാണ്." – ജോൺ എഫ്. കെൻഡീ`,
      `"കൃഷി പ്രതീക്ഷയുടെ പ്രൊഫഷനാണ്." – ബ്രയൻ ബ്രെറ്റ്`,
      `"കർഷി കേരളത്തിന്റെ സമ്പദ് വ്യവസ്ഥയുടെ പുറംഭാഗമാണ്, മില്ല്യണുകൾക്ക് ആശ്രയമാണ്."`
    ],
    statsTitle: "താഴെക്കൂടി അറിയാമോ?",
    stats: [
      "കേരളത്തിലെ ഗ്രാമപ്രവർത്തകരുടെ 60%ത്തിലധികം കൃഷിയിലാണ് പ്രവർത്തിക്കുന്നത്.",
      "കേരളം ഇന്ത്യയിലെ തേങ്ങയും മസാലകളും പ്രധാനമായ ഉത്പാദകനാണ്.",
      "ചെറുകിട കൃഷികൾ വലുതാണ്, ശരാശരി കൃഷിസ്ഥലം 2 ഹെക്ടർ താഴെ."
    ],
    footer: "© 2025 കർഷക മിത്രം - കേരള കർഷകരെ പിന്തുണയ്ക്കുന്നു",
    switchToMalayalam: "മലയാളത്തിലേക്ക് മാറുക",
    switchToEnglish: "Switch to English",
  },
};

export default function Index() {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const t = translations[language];

  return (
    <div className="flex flex-col min-h-screen font-sans relative">
      <Navbar language={language} setLanguage={setLanguage} />

      <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-700 via-green-600 to-yellow-400 text-white text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          {t.welcomeTitle}
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-10 drop-shadow-md">
          {t.welcomeDesc}
        </p>
        <Link
          to="/reco"
          className="bg-yellow-400 text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          {t.exploreNow}
        </Link>
      </section>

      <section className="h-screen bg-green-100 text-green-900 flex flex-col justify-center items-center px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">{t.aboutTitle}</h2>
        <div className="max-w-3xl space-y-6 text-lg">
          {t.aboutParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="h-screen bg-green-50 flex flex-col justify-center items-center px-6 py-12">
        <h2 className="text-4xl font-bold mb-10 text-green-900">{t.featuresTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {t.features.map((feature, i) => (
            <Link
              key={i}
              to={feature.link}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 cursor-pointer"
              aria-label={`Go to ${feature.title} page`}
            >
              <h3 className="text-xl font-bold mb-3 text-green-800">{feature.title}</h3>
              <p className="text-gray-700 mb-6">{feature.desc}</p>
              <button
                type="button"
                className="bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition cursor-pointer"
                onClick={(e) => e.preventDefault()}
                tabIndex={-1}
                aria-hidden="true"
              >
                Go
              </button>
            </Link>
          ))}
        </div>
      </section>

      <section className="h-screen bg-green-200 flex flex-col justify-center items-center px-6 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-900">{t.quotesTitle}</h2>
        <div className="max-w-4xl space-y-4 text-lg italic">
          {t.quotes.map((quote, i) => (
            <p key={i}>"{quote}"</p>
          ))}
        </div>

        <h2 className="text-4xl font-bold mt-12 mb-6 text-green-900">{t.statsTitle}</h2>
        <ul className="max-w-4xl space-y-2 text-left text-lg list-disc list-inside">
          {t.stats.map((stat, i) => (
            <li key={i}>{stat}</li>
          ))}
        </ul>
      </section>

      <footer className="bg-green-700 text-white py-6 text-center">{t.footer}</footer>

      
    </div>
  );
}
