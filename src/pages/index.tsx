import { useState } from "react";
import Navbar from "@/components/navbar";
import { Link } from "react-router-dom";

const translations = {
  en: {
    welcomeTitle: "🌾 Welcome to Farm Guru",
    welcomeDesc:
      "Your personalized farming assistant for Indian farmers. Make better crop decisions, track mandi prices, and stay updated with weather info.",
    exploreNow: "Explore Now",
    aboutTitle: "About Farmers in Kerala",
    aboutParagraphs: [
      "Kerala is home to thousands of small and medium scale farmers who cultivate rice, coconut, rubber, spices, and vegetables. Farming sustains livelihoods and preserves cultural heritage.",
      "Farmers face challenges like unpredictable rainfall, pest attacks, and fluctuating market prices. Farm Guru aims to provide actionable insights to make their work easier and more profitable.",
      "By leveraging technology, farmers can increase yield, reduce losses, and contribute to sustainable agriculture.",
    ],
    featuresTitle: "Our Features",
    features: [
      {
        title: "🤖 AI Chat",
        desc: "Ask farming questions in English or Malayalam.",
        link: "/ai",
      },
      {
        title: "📊 Mandi Prices",
        desc: "Check today's crop prices in Kerala markets.",
        link: "/mandi",
      },
      {
        title: "🌦 Weather",
        desc: "Get rainfall, temperature, and farming alerts.",
        link: "/weather",
      },
      {
        title: "👤 Profile",
        desc: "Manage your farmer ID and preferences.",
        link: "/profile",
      },
    ],
    goTo: "Go to",
    joinTitle: "Join Farm Guru Today",
    joinDesc:
      "Get started with your farmer ID and explore all the features we have planned for you.",
    register: "Register",
    footer: "© 2025 Farm Guru - Supporting Kerala Farmers",
    switchToMalayalam: "മലയാളത്തിലേക്ക് മാറുക",
    switchToEnglish: "Switch to English",
  },
  ml: {
    welcomeTitle: "🌾 ഫാം ഗുരുവിലേക്ക് സ്വാഗതം",
    welcomeDesc:
      "കേരളത്തിലെ കർഷകർക്ക് വേണ്ടി രൂപകൽപ്പന ചെയ്ത നിങ്ങളുടെ വ്യക്തിഗത കൃഷി സഹായി. മികച്ച വിളവെടുപ്പ് തീരുമാനങ്ങൾ എടുക്കുക, മണ്ടി വിലകൾ പിന്തുടരുക, കാലാവസ്ഥ വിവരങ്ങൾ അറിയുക.",
    exploreNow: "ഇപ്പോൾ അന്വേഷിക്കുക",
    aboutTitle: "കേരളത്തിലെ കർഷകർക്ക് കുറിച്ച്",
    aboutParagraphs: [
      "കേരളത്തിൽ അരി, തേങ്ങ, റബ്ബർ, മസാലകൾ, പച്ചക്കറികൾ തുടങ്ങിയ വിളകൾ കൃഷി ചെയ്യുന്ന ആയിരക്കണക്കിന് ചെറുകിട, മധ്യവലുപ്പ കർഷകർ ഉണ്ട്. കൃഷി ജീവിതോപാധികൾ നിലനിർത്തുകയും സാംസ്കാരിക പൈതൃകം സംരക്ഷിക്കുകയും ചെയ്യുന്നു.",
      "മഴക്കാലം അനിശ്ചിതത്വം, കീടങ്ങൾ, വിപണി വില വ്യത്യാസങ്ങൾ തുടങ്ങിയ വെല്ലുവിളികൾ കർഷകർ നേരിടുന്നു. ഫാം ഗുരു അവരുടെ ജോലി എളുപ്പമാക്കാനും ലാഭകരമാക്കാനും സഹായിക്കുന്ന പ്രായോഗിക അറിവുകൾ നൽകുന്നു.",
      "സാങ്കേതിക വിദ്യ ഉപയോഗിച്ച് കർഷകർ വിളവെടുപ്പ് വർദ്ധിപ്പിക്കുകയും നഷ്ടങ്ങൾ കുറയ്ക്കുകയും സുസ്ഥിര കൃഷിയിൽ സംഭാവന നൽകുകയും ചെയ്യുന്നു.",
    ],
    featuresTitle: "നമ്മുടെ സവിശേഷതകൾ",
    features: [
      {
        title: "🤖 എഐ ചാറ്റ്",
        desc: "ഇംഗ്ലീഷിലും മലയാളത്തിലും കൃഷി ചോദ്യങ്ങൾ ചോദിക്കാം.",
        link: "/ai-chat",
      },
      {
        title: "📊 മണ്ടി വിലകൾ",
        desc: "കേരളത്തിലെ വിപണികളിലെ ഇന്നത്തെ വിളവിന്റെ വിലകൾ പരിശോധിക്കുക.",
        link: "/mandi-prices",
      },
      {
        title: "🌦 കാലാവസ്ഥ",
        desc: "മഴ, താപനില, കൃഷി മുന്നറിയിപ്പുകൾ ലഭിക്കുക.",
        link: "/weather",
      },
      {
        title: "👤 പ്രൊഫൈൽ",
        desc: "നിങ്ങളുടെ കർഷക ഐഡി, ഇഷ്ടാനുസൃതികൾ നിയന്ത്രിക്കുക.",
        link: "/profile",
      },
    ],
    goTo: "കയറിയേൽക്കൂ",
    joinTitle: "ഇന്ന് ഫാം ഗുരുവിൽ ചേരൂ",
    joinDesc:
      "നിങ്ങളുടെ കർഷക ഐഡിയിൽ നിന്ന് ആരംഭിച്ച് ഞങ്ങൾ ഒരുക്കിയ എല്ലാ സവിശേഷതകളും അനുഭവിക്കൂ.",
    register: "രജിസ്റ്റർ ചെയ്യുക",
    footer: "© 2025 ഫാം ഗുരു - കേരള കർഷകരെ പിന്തുണയ്ക്കുന്നു",
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
        <a
          href="/"
          className="bg-yellow-400 text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          {t.exploreNow}
        </a>
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
        <h2 className="text-4xl font-bold mb-10 text-green-900">
          {t.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {t.features.map((feature, i) => (
            <Link
              key={i}
              to={feature.link}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 cursor-pointer"
              aria-label={`Go to ${feature.title} page`}
            >
              <h3 className="text-xl font-bold mb-3 text-green-800">
                {feature.title}
              </h3>
              <p className="text-gray-700 mb-6">{feature.desc}</p>
              <button
                type="button"
                className="bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition cursor-pointer"
                onClick={(e) => e.preventDefault()} // prevent double navigation, since Link handles it
                tabIndex={-1} // exclude from tab order, card is clickable
                aria-hidden="true"
              >
                {t.goTo}
              </button>
            </Link>
          ))}
        </div>
      </section>

      <section className="h-screen bg-green-600 text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
          {t.joinTitle}
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-10 drop-shadow-md">
          {t.joinDesc}
        </p>
        <a
          href="/"
          className="bg-yellow-400 text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          {t.register}
        </a>
      </section>

      <footer className="bg-green-700 text-white py-6 text-center">
        {t.footer}
      </footer>

      
      <button
        onClick={() => setLanguage(language === "en" ? "ml" : "en")}
        className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-800 transition"
        aria-label={
          language === "en" ? "Switch to Malayalam" : "Switch to English"
        }
      >
        {language === "en" ? t.switchToMalayalam : t.switchToEnglish}
      </button>
    </div>
  );
}
