import { useEffect, useState, useRef } from "react";

// Minimal type for Open-Meteo API response (to improve type safety)
interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
  };
}

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
  precipitation: number; // Renamed from chanceOfRain for accuracy (mm)
}

// Props interface for language sync (this fixes TS(2322) in WeatherPage)
interface WeatherLiveProps {
  language: "en" | "ml";
}

export default function WeatherLive({ language }: WeatherLiveProps) {
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

  // Translation helpers (uses prop language for global sync)
  const getTranslations = () => {
    return language === "en"
      ? {
          title: "🌤️ Live Weather Information",
          wind: "Wind",
          precipitationToday: "Precipitation",
          humidity: "Humidity",
          pressure: "Pressure",
          forecastTitle: "5-Day Forecast",
          dataNote: "Some data (e.g., humidity) not available in free API",
          loading: "Loading weather data...",
          errorLocation: "Failed to get your location",
          errorGeolocation: "Geolocation not supported by your browser",
          errorFetch: "Error fetching weather",
          rainLabel: "Rain",
          precipitationLabel: "Precipitation",
        }
      : {
          title: "🌤️ ജീവനുള്ള കാലാവസ്ഥ വിവരങ്ങൾ",
          wind: "കാറ്റ്",
          precipitationToday: "മഴ",
          humidity: "ഈർപ്പം",
          pressure: "മർദ്ദം",
          forecastTitle: "5 ദിവസത്തെ പ്രവചനം",
          dataNote: "ചില ഡാറ്റ (ഉദാ. ഈർപ്പം) സൗജന്യ API-ൽ ലഭ്യമല്ല",
          loading: "കാലാവസ്ഥ ഡാറ്റ ലോഡ് ചെയ്യുന്നു...",
          errorLocation: "നിങ്ങളുടെ സ്ഥാനം ലഭിക്കാൻ കഴിഞ്ഞില്ല",
          errorGeolocation: "നിങ്ങളുടെ ബ്രൗസറിൽ ജിയോലൊക്കേഷൻ പിന്തുണയില്ല",
          errorFetch: "കാലാവസ്ഥ ഡാറ്റ ലഭിക്കുന്നതിൽ പിശക്",
          rainLabel: "മഴ",
          precipitationLabel: "മഴ",
        };
  };

  const getConditionMap = (): Record<number, string> => {
    return language === "en"
      ? {
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
        }
      : {
          0: "സൂര്യപ്രഭ",
          1: "പകുതി മേഘാവൃതം",
          2: "പകുതി മേഘാവൃതം",
          3: "മേഘാവൃതം",
          45: "മൂടൽമഞ്ഞ്",
          48: "മൂടൽമഞ്ഞ്",
          51: "മഴ",
          53: "മഴ",
          55: "മഴ",
          61: "മഴ",
          63: "മഴ",
          65: "മഴ",
          71: "മഞ്ഞ്",
          73: "മഞ്ഞ്",
          75: "മഞ്ഞ്",
          95: "കൊടുങ്കാറ്റ്",
          96: "കൊടുങ്കാറ്റ്",
          99: "കൊടുങ്കാറ്റ്",
        };
  };

  const getWeatherIcon = (condition: string) => {
    if (language === "en") {
      const lowerCondition = condition.toLowerCase();
      switch (true) {
        case lowerCondition.includes("sunny"):
          return "☀️";
        case lowerCondition.includes("partly cloudy"):
          return "⛅";
        case lowerCondition.includes("cloudy"):
          return "☁️";
        case lowerCondition.includes("rainy"):
          return "🌧️";
        case lowerCondition.includes("snowy"):
          return "❄️";
        case lowerCondition.includes("stormy"):
          return "⛈️";
        case lowerCondition.includes("foggy"):
          return "🌫️";
        default:
          return "🌤️";
      }
    } else {
      // Malayalam checks (direct string matching for Unicode)
      switch (true) {
        case condition.includes("സൂര്യപ്രഭ"):
          return "☀️";
        case condition.includes("പകുതി മേഘാവൃതം"):
          return "⛅";
        case condition.includes("മേഘാവൃതം"):
          return "☁️";
        case condition.includes("മഴ"):
          return "🌧️";
        case condition.includes("മഞ്ഞ്"):
          return "❄️";
        case condition.includes("കൊടുങ്കാറ്റ്"):
          return "⛈️";
        case condition.includes("മൂടൽമഞ്ഞ്"):
          return "🌫️";
        default:
          return "🌤️";
      }
    }
  };

  const fetchWeatherData = async (latitude: number, longitude: number, isFallback = false) => {
    setLoading(true);
    if (!isFallback) setError(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json() as OpenMeteoResponse;

      const conditionMap = getConditionMap();
      const currentTemp = data.current_weather.temperature;
      const weatherCode = data.current_weather.weathercode as number;

      const mappedWeather: WeatherData = {
        temperature: currentTemp,
        condition: conditionMap[weatherCode] || "Unknown",
        humidity: 0, // Not available in free API
        windSpeed: data.current_weather.windspeed,
        pressure: 0, // Not available
        visibility: 0, // Not available
        cloudCover: 0, // Not available
        uvIndex: 0, // Not available
        forecast: data.daily.time.map((date: string, idx: number) => {
          const dailyCode = data.daily.weathercode[idx] as number;
          return {
            date,
            maxTemp: data.daily.temperature_2m_max[idx],
            minTemp: data.daily.temperature_2m_min[idx],
            condition: conditionMap[dailyCode] || "Unknown",
            precipitation: data.daily.precipitation_sum[idx],
          };
        }),
      };

      if (mountedRef.current) {
        setWeather(mappedWeather);
        setLoading(false);
        if (isFallback) setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        const errorMsg = err instanceof Error ? err.message : getTranslations().errorFetch;
        setError(errorMsg);
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
          setError(getTranslations().errorLocation);
          fetchWeatherData(9.9312, 76.2673, true); // Kochi fallback
        }
      );
    } else {
      setError(getTranslations().errorGeolocation);
      fetchWeatherData(9.9312, 76.2673, true); // Kochi fallback
    }
  }, []); // No dependency on language (avoids re-fetch on toggle)

  const t = getTranslations();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-800">{t.title}</h2>
          <div className="flex space-x-2">
            <button
              onClick={toggleUnit}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              title="Toggle temperature unit"
            >
              °{unit === "celsius" ? "C" : "F"}
            </button>
          </div>
        </div>

        {loading && <div className="text-center py-4">{t.loading}</div>}
        {error && !loading && <div className="text-red-600 text-center py-4">{error}</div>}

        {!loading && !error && weather && (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl">{getWeatherIcon(weather.condition)}</div>
                <div className="text-3xl font-bold">
                  {convertTemp(weather.temperature)}°{unit === "celsius" ? "C" : "F"}
                </div>
                <div className="text-gray-600">{weather.condition}</div>
              </div>
              <div className="text-sm text-gray-500 mt-2">{t.dataNote}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-gray-500">{t.wind}</div>
                  <div className="text-xl font-semibold">{weather.windSpeed} km/h</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500">{t.precipitationToday}</div>
                  <div className="text-xl font-semibold">{weather.forecast[0].precipitation} mm</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500">{t.humidity}</div>
                  <div className="text-xl font-semibold">N/A</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500">{t.pressure}</div>
                  <div className="text-xl font-semibold">N/A</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.forecastTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {weather.forecast.slice(0, 5).map((day, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-4 text-center">
                  <div className="text-lg font-semibold text-gray-700">
                    {new Date(day.date).toLocaleDateString(
                      language === "en" ? "en-US" : "ml-IN",
                      { weekday: "short" }
                    )}
                  </div>
                  <div className="text-3xl my-2">{getWeatherIcon(day.condition)}</div>
                  <div className="text-gray-700 text-sm mb-1">{day.condition}</div>
                  <div className="flex justify-center space-x-2">
                    <div className="font-bold">{convertTemp(day.maxTemp)}°</div>
                    <div className="text-gray-500">{convertTemp(day.minTemp)}°</div>
                  </div>
                  <div className="text-sm text-blue-500 mt-1">
                    {t.rainLabel}: {day.precipitation} mm
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