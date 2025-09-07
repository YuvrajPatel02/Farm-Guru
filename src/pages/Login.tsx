import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(userId);

    if (!storedUser) {
      setError("User ID does not exist");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
      localStorage.setItem("loggedInUser", userId); 
      navigate("/home");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-400">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-2xl px-10 py-12 w-96 flex flex-col space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-green-800 mb-4 drop-shadow-md">
          🌾 Farm Guru Login
        </h1>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="px-5 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-green-400 text-green-900"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-5 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-green-400 text-green-900"
        />

        <button className="bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition">
          Login
        </button>

        <p className="text-center text-green-700 text-sm mt-2">
          🌱 Supporting Indian Farmers
        </p>

        <p className="text-center text-green-700 text-sm mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer hover:text-green-900"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
