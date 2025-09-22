// components/CropRecommendation.tsx
import React, { useState, useEffect } from "react";
import { CropFormData, OptionsResponse, ApiResponse } from "../types/crops";
import type { CropRecommendation } from "../types/crops";
import Navbar from "./navbar";

const CropRecommendation: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ml">("en"); // Local language state for this page
  const [formData, setFormData] = useState<CropFormData>({
    District: "",
    Season: "",
    Rainfall: "",
    Temperature: "",
    LandType: "",
    Irrigation: "",
    SoilType: "",
  });

  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<OptionsResponse>({});

  // Load saved language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as
      | "en"
      | "ml"
      | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  // Translations object (declared before use)
  const translations = {
    en: {
      title: "🌾 Kerala Crop Recommendation System",
      subtitle:
        "Get personalized crop recommendations based on your farming conditions",
      district: "District",
      season: "Season",
      rainfall: "Rainfall",
      temperature: "Temperature",
      landType: "Land Type",
      irrigation: "Irrigation",
      soilType: "Soil Type",
      select: (label: string) => `Select ${label}`,
      getRecommendations: "Get Crop Recommendations",
      gettingRecommendations: "Getting Recommendations...",
      recommendedCrops: "🌱 Recommended Crops",
      recommendation: (rank: number) => `#${rank} Recommendation`,
      confidence: "Confidence:",
      errorMessages: {
        server:
          "Failed to connect to the server. Please make sure the backend is running.",
        generic: "Something went wrong",
      },
    },
    ml: {
      title: "🌾 കേരള കൃഷി ശുപാർശ സംവിധാനം",
      subtitle:
        "നിങ്ങളുടെ കൃഷി സാഹചര്യങ്ങൾ അടിസ്ഥാനമാക്കി വ്യക്തിഗത കൃഷി ശുപാർശകൾ നേടുക",
      district: "ജില്ല",
      season: "സീസൺ",
      rainfall: "മഴ",
      temperature: "താപനില",
      landType: "ഭൂമി തരം",
      irrigation: "ചോരിവിത്ത",
      soilType: "മണ്ണ് തരം",
      select: (label: string) => `${label} തിരഞ്ഞെടുക്കുക`,
      getRecommendations: "കൃഷി ശുപാർശകൾ നേടുക",
      gettingRecommendations: "ശുപാർശകൾ ലഭ്യമാക്കുന്നു...",
      recommendedCrops: "🌱 ശുപാർശ ചെയ്ത കൃഷികൾ",
      recommendation: (rank: number) => `#${rank} ശുപാർശ`,
      confidence: "ആത്മവിശ്വാസം:",
      errorMessages: {
        server:
          "സെർവറിലേക്ക് കണക്റ്റ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ബാക്ക്‌എൻഡ് പ്രവർത്തിക്കുന്നുണ്ടോ എന്ന് ഉറപ്പാക്കുക.",
        generic: "എന്തോ തെറ്റായി",
      },
    },
  } as const;

  const t = translations[language];

  // Fetch available options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          "https://web-production-eee34.up.railway.app/api/options"
        );

        const data: OptionsResponse = await response.json();

        if (data.error) {
          console.error("Error fetching options:", data.error);
        } else {
          setOptions(data);
        }
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://web-production-eee34.up.railway.app/api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data: ApiResponse = await response.json();

      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.error || t.errorMessages.generic);
      }
    } catch (err) {
      setError(t.errorMessages.server);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = (): boolean => {
    return Object.values(formData).every((value) => value !== "");
  };

  // Define a union type for valid label keys (only string properties)
  type LabelKey =
    | "district"
    | "season"
    | "rainfall"
    | "temperature"
    | "landType"
    | "irrigation"
    | "soilType";

  // Form fields configuration with narrowed labelKey type
  const formFields = [
    { name: "District", labelKey: "district" as LabelKey },
    { name: "Season", labelKey: "season" as LabelKey },
    { name: "Rainfall", labelKey: "rainfall" as LabelKey },
    { name: "Temperature", labelKey: "temperature" as LabelKey },
    { name: "LandType", labelKey: "landType" as LabelKey },
    { name: "Irrigation", labelKey: "irrigation" as LabelKey },
    { name: "SoilType", labelKey: "soilType" as LabelKey },
  ] as const;

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-emerald-600 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-white">
            <h1 className="text-4xl font-bold text-center mb-2">{t.title}</h1>
            <p className="text-lg text-center opacity-90">{t.subtitle}</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => {
                  const labelText = t[field.labelKey]; // Now guaranteed to be string
                  return (
                    <div key={field.name} className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {labelText} *
                      </label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">{t.select(labelText)}</option>{" "}
                        {/* Pass string to function */}
                        {options[field.name]?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  !isFormValid() || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.gettingRecommendations}
                  </span>
                ) : (
                  t.getRecommendations
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-700">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {t.recommendedCrops}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-transform duration-200 hover:scale-105 ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
                          : index === 1
                            ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
                            : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {t.recommendation(index + 1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {rec.crop}
                      </h3>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold">{t.confidence}</span>
                        <span className="ml-2 text-lg font-bold text-green-600">
                          {rec.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CropRecommendation;
