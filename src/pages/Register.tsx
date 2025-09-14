import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: fullName });
      setError("");
      alert("Registration successful!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-400 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white rounded-2xl shadow-2xl px-10 py-10 w-full max-w-4xl flex flex-col space-y-6 md:space-y-8"
      >
        <h1 className="text-3xl font-extrabold text-center text-green-800 mb-4 drop-shadow-md">
          🌾 Register
        </h1>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-400 text-green-900"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-400 text-green-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-400 text-green-900"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-400 text-green-900"
          />
        </div>

        <button className="bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition">
          Register
        </button>

        <p className="text-center text-green-700 text-sm mt-2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer hover:text-green-900"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
