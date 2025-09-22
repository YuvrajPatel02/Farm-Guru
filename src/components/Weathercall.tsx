import { useEffect, useState, useRef } from "react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  cloudCover: number;
  uvIndex: number;
  forecast: DailyForecast[];
}

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  chanceOfRain: number;
}

export default function WeatherLive() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const toggleUnit = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  const convertTemp = (temp: number): number => {
    return unit === "fahrenheit" ? Math.round((temp * 9) / 5 + 32) : temp;
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️";
      case "partly cloudy":
        return "⛅";
      case "cloudy":
        return "☁️";
      case "rainy":
        return "🌧️";
      case "snowy":
        return "❄️";
      case "stormy":
        return "⛈️";
      default:
        return "🌤️";
    }
  };

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();

      // Map Open-Meteo data to our WeatherData structure
      const currentTemp = data.current_weather.temperature;
      const weatherCode = data.current_weather.weathercode;

      const conditionMap: Record<number, string> = {
        0: "Sunny",
        1: "Partly Cloudy",
        2: "Partly Cloudy",
        3: "Cloudy",
        45: "Foggy",
        48: "Foggy",
        51: "Rainy",
        53: "Rainy",
        55: "Rainy",
        61: "Rainy",
        63: "Rainy",
        65: "Rainy",
        71: "Snowy",
        73: "Snowy",
        75: "Snowy",
        95: "Stormy",
        96: "Stormy",
        99: "Stormy",
      };

      const mappedWeather: WeatherData = {
        temperature: currentTemp,
        condition: conditionMap[weatherCode] || "Unknown",
        humidity: 0, // Open-Meteo free API does not provide humidity directly
        windSpeed: data.current_weather.windspeed,
        pressure: 0, // Not available
        visibility: 0, // Not available
        cloudCover: 0, // Not available
        uvIndex: 0, // Not available
        forecast: data.daily.time.map((date: string, idx: number) => ({
          date,
          maxTemp: data.daily.temperature_2m_max[idx],
          minTemp: data.daily.temperature_2m_min[idx],
          condition: conditionMap[data.daily.weathercode[idx]] || "Unknown",
          chanceOfRain: data.daily.precipitation_sum[idx],
        })),
      };

      if (mountedRef.current) {
        setWeather(mappedWeather);
        setLoading(false);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Error fetching weather");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherData(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Failed to get your location");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
      setLoading(false);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-800">
            🌤️ Live Weather Information
          </h2>
          <button
            onClick={toggleUnit}
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            °{unit === "celsius" ? "C" : "F"}
          </button>
        </div>

        {loading && <div>Loading weather data...</div>}
        {error && <div className="text-red-600">{error}</div>}

        {!loading && !error && weather && (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl">
                  {getWeatherIcon(weather.condition)}
                </div>
                <div className="text-3xl font-bold">
                  {convertTemp(weather.temperature)}°
                  {unit === "celsius" ? "C" : "F"}
                </div>
                <div className="text-gray-600">{weather.condition}</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-gray-500">Wind</div>
                  <div className="text-xl font-semibold">
                    {weather.windSpeed} km/h
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500">Chance of Rain</div>
                  <div className="text-xl font-semibold">
                    {weather.forecast[0].chanceOfRain} mm
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {weather.forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-4 text-center"
                >
                  <div className="text-lg font-semibold text-gray-700">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-3xl my-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="text-gray-700 text-sm mb-1">
                    {day.condition}
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="font-bold">{convertTemp(day.maxTemp)}°</div>
                    <div className="text-gray-500">
                      {convertTemp(day.minTemp)}°
                    </div>
                  </div>
                  <div className="text-sm text-blue-500 mt-1">
                    Rain: {day.chanceOfRain} mm
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
