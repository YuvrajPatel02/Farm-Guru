import Navbar from "@/components/navbar";
import WeatherLive from "../components/Weathercall";

function WeatherPage() {
  return (<>
  <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            🌤️ Live Weather Dashboard
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Get real-time weather updates and forecasts for your current location. Allow location access to see your local weather instantly.
          </p>
        </div>

        {/* WeatherLive Component */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <WeatherLive />
        </div>

        {/* Info / Tips Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Weather Tips & Info</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Use this dashboard to track temperature, wind, precipitation, UV index, and a 5-day forecast. Stay safe and plan your day!
          </p>
          <div className="flex justify-center space-x-6 flex-wrap">
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">☀️ Sunny</span>
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">🌧️ Rainy</span>
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">🌤️ Partly Cloudy</span>
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">⛈️ Stormy</span>
            <span className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full">❄️ Snowy</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          For our Farmers...
        </div>
      </div>
    </div>
 </> );
}

export default WeatherPage;
