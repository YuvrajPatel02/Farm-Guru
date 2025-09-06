import Navbar from "@/components/navbar";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
  
      <Navbar />

      
      <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-700 via-green-600 to-yellow-400 text-white text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          🌾 Welcome to Farm Guru
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-10 drop-shadow-md">
          Your personalized farming assistant for Indian farmers. Make better crop
          decisions, track mandi prices, and stay updated with weather info.
        </p>
        <a
          href="/"
          className="bg-yellow-400 text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Explore Now
        </a>
      </section>

      
      <section className="h-screen bg-green-100 text-green-900 flex flex-col justify-center items-center px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">About Farmers in India</h2>
        <div className="max-w-3xl space-y-6 text-lg">
          <p>
            India is home to thousands of small and medium scale farmers who
            cultivate rice, coconut, rubber, spices, and vegetables. Farming
            sustains livelihoods and preserves cultural heritage.
          </p>
          <p>
            Farmers face challenges like unpredictable rainfall, pest attacks, and
            fluctuating market prices. Farm Guru aims to provide actionable
            insights to make their work easier and more profitable.
          </p>
          <p>
            By leveraging technology, farmers can increase yield, reduce losses,
            and contribute to sustainable agriculture.
          </p>
        </div>
      </section>

      
      <section className="h-screen bg-green-50 flex flex-col justify-center items-center px-6 py-12">
        <h2 className="text-4xl font-bold mb-10 text-green-900">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {[
            { title: "🤖 AI Chat", desc: "Ask farming questions in English or other languages." },
            { title: "📊 Mandi Prices", desc: "Check today’s crop prices in various markets." },
            { title: "🌦 Weather", desc: "Get rainfall, temperature, and farming alerts." },
            { title: "👤 Profile", desc: "Manage your farmer ID and preferences." },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-xl font-bold mb-3 text-green-800">{feature.title}</h3>
              <p className="text-gray-700 mb-6">{feature.desc}</p>
              <button className="bg-green-700 text-white py-2 rounded-lg opacity-60 cursor-not-allowed hover:opacity-70 transition">
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </section>

     
      <section className="h-screen bg-green-600 text-white flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Join Farm Guru Today</h2>
        <p className="text-lg md:text-xl max-w-2xl mb-10 drop-shadow-md">
          Get started with your farmer ID and explore all the features we have
          planned for you.
        </p>
        <a
          href="/"
          className="bg-yellow-400 text-green-800 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Register
        </a>
      </section>

      
      <footer className="bg-green-700 text-white py-6 text-center">
        © 2025 Farm Guru - Supporting Kerala Farmers
      </footer>
    </div>
  );
}
