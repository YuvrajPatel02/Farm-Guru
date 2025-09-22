import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import Navbar from "@/components/navbar";
import { translations } from "../types/locales";

type QueryCategory = "Crop" | "Pest" | "Weather" | "Market" | "Other";

export default function AskExperts() {
  const [language, setLanguage] = useState<"en" | "ml">("en");
  const t = translations[language];

  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryDetails, setQueryDetails] = useState("");
  const [category, setCategory] = useState<QueryCategory>("Crop");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentQueries, setRecentQueries] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return setRecentQueries([]);
    const fetchQueries = async () => {
      try {
        const q = query(
          collection(db, "expertQueries"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        setRecentQueries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchQueries();
  }, [userId]);

  const validatePhone = (phone: string) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !userId || !queryTitle || !queryDetails || !phone) {
      setError(t.allFieldsRequired);
      setSuccess("");
      return;
    }
    if (!validatePhone(phone)) {
      setError(t.invalidPhone);
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await addDoc(collection(db, "expertQueries"), {
        fullName,
        userId,
        phone,
        queryTitle,
        queryDetails,
        category,
        createdAt: serverTimestamp(),
        status: "Pending",
      });

      setSuccess(t.successMessage);

      setFullName("");
      setUserId("");
      setPhone("");
      setQueryTitle("");
      setQueryDetails("");
      setCategory("Crop");

      setRecentQueries((prev) => [
        { fullName, userId, phone, queryTitle, queryDetails, category, createdAt: new Date(), status: "Pending", id: "temp" },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
      setError(t.somethingWentWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-600">
      <Navbar />
      <div className="flex flex-col items-center px-4 py-10 max-w-5xl mx-auto">
        {/* Language toggle */}
        <div className="mb-6 flex justify-end space-x-4">
          <button onClick={() => setLanguage("en")} className={`px-4 py-2 rounded ${language === "en" ? "bg-green-800 text-white" : "bg-green-200 text-green-800"}`}>English</button>
          <button onClick={() => setLanguage("ml")} className={`px-4 py-2 rounded ${language === "ml" ? "bg-green-800 text-white" : "bg-green-200 text-green-800"}`}>മലയാളം</button>
        </div>

        <form onSubmit={handleSubmit} className="bg-green-50 rounded-2xl shadow-2xl px-10 py-10 w-full max-w-3xl flex flex-col space-y-5 border-2 border-green-200">
          <h1 className="text-3xl font-extrabold text-center text-green-800 mb-4 drop-shadow-md">{t.askExperts}</h1>
          {error && <p className="text-red-500 text-center font-medium">{error}</p>}
          {success && <p className="text-green-700 text-center font-medium">{success}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder={t.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900" maxLength={50} required />
            <input type="text" placeholder={t.userId} value={userId} onChange={(e) => setUserId(e.target.value)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900" maxLength={20} required />
          </div>

          <input type="tel" placeholder={t.phone} value={phone} onChange={(e) => setPhone(e.target.value)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900" maxLength={10} required />

          <select value={category} onChange={(e) => setCategory(e.target.value as QueryCategory)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-green-900">
            {Object.entries(t.categories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>

          <input type="text" placeholder={t.queryTitle} value={queryTitle} onChange={(e) => setQueryTitle(e.target.value)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900" maxLength={100} required />
          <textarea placeholder={t.queryDetails} value={queryDetails} onChange={(e) => setQueryDetails(e.target.value)} className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900 resize-none h-32" maxLength={1000} required />

          <button type="submit" disabled={loading} className="bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? t.submitting : t.submitQuery}
          </button>
        </form>
      </div>
    </div>
  );
}
