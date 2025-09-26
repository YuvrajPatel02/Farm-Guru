import { useState } from "react";
import Navbar from "@/components/navbar";
import { Link } from "react-router-dom";

const translations = {
  en: {
    welcomeTitle: "🌾 Welcome to Karshaka Mithram",
    welcomeDesc: "Your personalized farming assistant for Kerala farmers. Explore crop recommendations, mandi prices, weather updates, and expert advice to empower your farming.",
    exploreNow: "Explore Now",
    aboutTitle: "About Kerala Agriculture",
    aboutParagraphs: [
      "Kerala is home to thousands of small and medium-scale farmers who cultivate rice, coconut, rubber, spices, and vegetables. Farming sustains livelihoods and preserves cultural heritage.",
      "Farmers face challenges like unpredictable rainfall, pest attacks, and fluctuating market prices. Karshaka Mithram aims to provide actionable insights to make their work easier and more profitable.",
      "By leveraging technology, farmers can increase yield, reduce losses, and contribute to sustainable agriculture."
    ],
    featuresTitle: "Our Features",
    features: [
      { title: "🌾 Smart Crop Recommendations", desc: "AI-powered crop suggestions based on soil type, season, and market demand.", link: "/reco", icon: "🌱" },
      { title: "💬 Expert Consultation", desc: "Connect with agricultural scientists and experienced farmers.", link: "/ask", icon: "👨‍🌾" },
      { title: "📊 Real-time Market Prices", desc: "Live mandi prices with trend analysis and price forecasting.", link: "/mandi", icon: "💹" },
      { title: "🌦 Precision Weather Alerts", desc: "Hyper-local weather forecasts and farming advisories.", link: "/weather", icon: "⛅" },
      { title: "📈 Yield Analytics", desc: "Track and optimize your crop production with data insights.", link: "/analytics", icon: "📊" },
      { title: "🛒 Digital Marketplace", desc: "Sell your produce directly to buyers across Kerala.", link: "/marketplace", icon: "🛒" },
    ],
    quotesTitle: "Farmer Wisdom",
    quotes: [
      `"The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways." – John F. Kennedy`,
      `"Farming is a profession of hope." – Brian Brett`,
      `"Agriculture is the backbone of Kerala's economy, supporting millions of lives."`
    ],
    statsTitle: "Kerala Agriculture Insights",
    stats: [
      "Over 60% of Kerala's rural population depends on agriculture",
      "Kerala contributes 70% of India's coconut production",
      "Average farm size: 0.2 hectares (among smallest in India)",
      "Organic farming growing at 25% annually"
    ],
    footer: "© 2025 Karshaka Mithram - Empowering Kerala Farmers with Technology",
    switchToMalayalam: "മലയാളത്തിലേക്ക് മാറുക",
    switchToEnglish: "Switch to English",
  },
  ml: {
    welcomeTitle: "🌾 കർഷക മിത്രത്തിലേക്ക് സ്വാഗതം",
    welcomeDesc: "കേരളത്തിലെ കർഷകർക്ക് വേണ്ടി രൂപകൽപ്പന ചെയ്ത നിങ്ങളുടെ വ്യക്തിഗത കൃഷി സഹായി. വിളവുകൾ ശുപാർശ ചെയ്യുക, മണ്ടി വിലകൾ അറിയുക, കാലാവസ്ഥയും വിദഗ്ധരുടെയും നിർദ്ദേശങ്ങളും ലഭിക്കുക.",
    exploreNow: "ഇപ്പോൾ അന്വേഷിക്കുക",
    aboutTitle: "കേരള കൃഷി",
    aboutParagraphs: [
      "കേരളത്തിൽ അനവധി ചെറുകിട, മധ്യവലുപ്പ കർഷകർ അരി, തേങ്ങ, റബ്ബർ, മസാലകൾ, പച്ചക്കറികൾ തുടങ്ങിയ വിളകൾ കൃഷി ചെയ്യുന്നു. കൃഷി ജീവിതോപാധികൾ നിലനിർത്തുകയും സാംസ്കാരിക പൈതൃകം സംരക്ഷിക്കുകയും ചെയ്യുന്നു.",
      "കർഷകർക്ക് മഴക്കാലം അനിശ്ചിതത്വം, കീടങ്ങൾ, വിപണി വില വ്യത്യാസങ്ങൾ പോലുള്ള വെല്ലുവിളികൾ നേരിടുന്നു. കർഷക മിത്രം അവരുടെ ജോലി എളുപ്പമാക്കാനും ലാഭകരമാക്കാനും സഹായിക്കുന്നു.",
      "സാങ്കേതിക വിദ്യ ഉപയോഗിച്ച് കർഷകർ വിളവെടുപ്പ് വർദ്ധിപ്പിക്കുകയും നഷ്ടങ്ങൾ കുറയ്ക്കുകയും സുസ്ഥിര കൃഷിയിൽ സംഭാവന നൽകുകയും ചെയ്യുന്നു."
    ],
    featuresTitle: "സവിശേഷതകൾ",
    features: [
      { title: "🌾 സ്മാർട്ട് വിള ശുപാർശകൾ", desc: "മണ്ണിനം, സീസൺ, വിപണി ആവശ്യം അടിസ്ഥാനമാക്കി AI വിള ശുപാർശകൾ.", link: "/reco", icon: "🌱" },
      { title: "💬 വിദഗ്ധ ഉപദേശം", desc: "കൃഷി ശാസ്ത്രജ്ഞരുമായും അനുഭവസമ്പന്നരായ കർഷകരുമായും ബന്ധപ്പെടുക.", link: "/ask", icon: "👨‍🌾" },
      { title: "📊 തത്സമയ വിപണി വിലകൾ", desc: "ട്രെൻഡ് വിശകലനവും വില പ്രവചനവും.", link: "/mandi", icon: "💹" },
      { title: "🌦 കാലാവസ്ഥ മുന്നറിയിപ്പുകൾ", desc: "ഹൈപ്പർ-ലോക്കൽ കാലാവസ്ഥ പ്രവചനങ്ങൾ.", link: "/weather", icon: "⛅" },
      { title: "📈 വിളവ് വിശകലനം", desc: "ഡാറ്റ ഉപയോഗിച്ച് വിളവ് ട്രാക്ക് ചെയ്യുകയും ഒപ്റ്റിമൈസ് ചെയ്യുകയും ചെയ്യുക.", link: "/analytics", icon: "📊" },
      { title: "🛒 ഡിജിറ്റൽ മാർക്കറ്റ്പ്ലേസ്", desc: "നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ നേരിട്ട് വാങ്ങുന്നവർക്ക് വിൽക്കുക.", link: "/marketplace", icon: "🛒" },
    ],
    quotesTitle: "കർഷക ജ്ഞാനം",
    quotes: [
      `"എല്ലാം റീട്ടെയിൽ വാങ്ങി, എല്ലാം ഹോൾസെയിൽ വിറ്റു, ഫ്രീറ്റ് രണ്ടുവഴിയും അടയ്ക്കുന്ന ഏകവ്യക്തി കർഷകനാണ്." – ജോൺ എഫ്. കെൻഡീ`,
      `"കൃഷി പ്രതീക്ഷയുടെ പ്രൊഫഷനാണ്." – ബ്രയൻ ബ്രെറ്റ്`,
      `"കർഷി കേരളത്തിന്റെ സമ്പദ് വ്യവസ്ഥയുടെ പുറംഭാഗമാണ്, മില്ല്യണുകൾക്ക് ആശ്രയമാണ്."`
    ],
    statsTitle: "കേരള കൃഷി 통계",
    stats: [
      "കേരളത്തിലെ ഗ്രാമീണ ജനസംഖ്യയുടെ 60% കൃഷിയെ ആശ്രയിച്ചാണ്",
      "ഇന്ത്യയിലെ തേങ്ങ ഉത്പാദനത്തിന്റെ 70% കേരളം",
      "ശരാശരി കൃഷിസ്ഥലം: 0.2 ഹെക്ടർ",
      "ഓർഗാനിക് ഫാമിംഗ് വാർഷികം 25% വർദ്ധനവ്"
    ],
    footer: "© 2025 കർഷക മിത്രം - സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് കേരള കർഷകരെ സശക്തീകരിക്കുന്നു",
    switchToMalayalam: "മലയാളത്തിലേക്ക് മാറുക",
    switchToEnglish: "Switch to English",
  },
};

// Mock data for charts
const cropProductionData = [
  { crop: "Rice", production: 650, color: "bg-green-500" },
  { crop: "Coconut", production: 850, color: "bg-emerald-500" },
  { crop: "Rubber", production: 450, color: "bg-teal-500" },
  { crop: "Spices", production: 320, color: "bg-lime-500" },
  { crop: "Vegetables", production: 280, color: "bg-green-400" },
];

const priceTrendData = [
  { month: "Jan", rice: 25, coconut: 18, rubber: 120 },
  { month: "Feb", rice: 28, coconut: 19, rubber: 125 },
  { month: "Mar", rice: 26, coconut: 20, rubber: 118 },
  { month: "Apr", rice: 30, coconut: 22, rubber: 130 },
  { month: "May", rice: 32, coconut: 21, rubber: 135 },
];

export default function Index() {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const t = translations[language];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-green-50 via-white to-emerald-50 relative">
      <Navbar language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M30%2C20%20C40%2C10%2C60%2C10%2C70%2C20%20S90%2C40%2C80%2C50%20S60%2C80%2C50%2C70%20S20%2C50%2C30%2C40%20S20%2C30%2C30%2C20%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.3%22/%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl">🌤️</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
            {t.welcomeTitle}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-8 leading-relaxed drop-shadow-lg">
            {t.welcomeDesc}
          </p>
          <Link
            to="/reco"
            className="inline-flex items-center px-8 py-4 bg-white text-green-700 font-bold text-lg rounded-full hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.exploreNow} →
          </Link>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                {t.aboutTitle}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                {t.aboutParagraphs.map((para, i) => (
                  <p key={i} className="py-2 border-l-4 border-green-200 pl-4 hover:border-green-400 transition-colors">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                    <div className="text-3xl mb-2">🌾</div>
                    <div className="font-bold text-green-700">50+ Crops</div>
                    <div className="text-sm text-gray-600">Supported</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                    <div className="text-3xl mb-2">👨‍🌾</div>
                    <div className="font-bold text-green-700">10K+ Farmers</div>
                    <div className="text-sm text-gray-600">Registered</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="font-bold text-green-700">30% Increase</div>
                    <div className="text-sm text-gray-600">In Yield</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 text-center shadow-sm">
                    <div className="text-3xl mb-2">💡</div>
                    <div className="font-bold text-green-700">24/7 Support</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-gray-900">
            {t.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((feature, i) => (
              <Link
                key={i}
                to={feature.link}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100 hover:border-green-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-green-200"
                aria-label={`Navigate to ${feature.title}`}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {feature.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600 group-hover:text-green-700">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics & Charts Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-gray-900">
            {t.statsTitle}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Production Chart */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Crop Production Distribution</h3>
              <div className="space-y-4">
                {cropProductionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{item.crop}</span>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${item.color} transition-all duration-1000`}
                          style={{ width: `${(item.production / 1000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-green-700">{item.production} tons</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Trends */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Price Trends (₹/kg)</h3>
              <div className="space-y-6">
                {priceTrendData.map((monthData, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 w-12">{monthData.month}</span>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-green-600">Rice</div>
                        <div className="font-bold">₹{monthData.rice}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-emerald-600">Coconut</div>
                        <div className="font-bold">₹{monthData.coconut}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-teal-600">Rubber</div>
                        <div className="font-bold">₹{monthData.rubber}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-3">📊</div>
                <p className="text-gray-700 font-medium">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-gray-900">
            {t.quotesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.quotes.map((quote, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">💭</div>
                <blockquote className="text-gray-700 leading-relaxed italic mb-4">
                  "{quote.split('–')[0]}"
                </blockquote>
                <cite className="text-sm font-semibold text-green-600 not-italic">
                  {quote.split('–')[1] || 'Traditional Wisdom'}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Kerala farmers who are already using Karshaka Mithram to increase their yields and profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-800 to-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">🌾</span>
                </div>
                <span className="text-2xl font-bold">Karshaka Mithram</span>
              </div>
              <p className="text-green-100 mb-4 max-w-md">
                Empowering Kerala farmers with technology-driven solutions for sustainable agriculture and better livelihoods.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/privacy" className="block text-green-100 hover:text-yellow-300 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="block text-green-100 hover:text-yellow-300 transition-colors">Terms of Service</Link>
                <Link to="/contact" className="block text-green-100 hover:text-yellow-300 transition-colors">Contact Us</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="space-y-2">
                <a href="#" className="block text-green-100 hover:text-yellow-300 transition-colors">Facebook</a>
                <a href="#" className="block text-green-100 hover:text-yellow-300 transition-colors">WhatsApp</a>
                <a href="#" className="block text-green-100 hover:text-yellow-300 transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-green-200">{t.footer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}