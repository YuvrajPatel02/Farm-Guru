import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Navbar from "@/components/navbar";

export default function AskExperts() {
  const [fullName, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [queryTitle, setQueryTitle] = useState("");
  const [queryDetails, setQueryDetails] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !userId || !queryTitle || !queryDetails) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    try {
      await addDoc(collection(db, "expertQueries"), {
        fullName,
        userId,
        queryTitle,
        queryDetails,
        createdAt: serverTimestamp(),
      });

      setError("");
      setSuccess(
        "✅ Your query has been submitted successfully! Our experts will get back to you soon."
      );

      setFullName("");
      setUserId("");
      setQueryTitle("");
      setQueryDetails("");
    } catch (err) {
      console.error("Error submitting query:", err);
      setError("Something went wrong while submitting your query. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-green-600">
      {/* Navbar stays at the top */}
      <Navbar />

      {/* Page content */}
      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-green-50 rounded-2xl shadow-2xl px-10 py-10 w-full max-w-3xl flex flex-col space-y-5 border-2 border-green-200"
        >
          <h1 className="text-3xl font-extrabold text-center text-green-800 mb-4 drop-shadow-md">
            💬 Ask Our Experts
          </h1>

          {error && <p className="text-red-500 text-center font-medium">{error}</p>}
          {success && <p className="text-green-700 text-center font-medium">{success}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900"
            />

            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900"
            />
          </div>

          <input
            type="text"
            placeholder="Query Title"
            value={queryTitle}
            onChange={(e) => setQueryTitle(e.target.value)}
            className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900"
          />

          <textarea
            placeholder="Describe your query in detail..."
            value={queryDetails}
            onChange={(e) => setQueryDetails(e.target.value)}
            className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-600 text-green-900 resize-none h-32"
          />

          <button className="bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition">
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
}
