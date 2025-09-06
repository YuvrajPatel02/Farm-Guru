import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar"; 

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
     
      <Navbar />

     
      <main className="flex flex-col items-center justify-center flex-grow bg-green-500 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
        <p className="mb-6">You are logged in successfully.</p>
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-green-800 px-4 py-2 rounded-md hover:bg-yellow-300 transition"
        >
          Logout
        </button>
      </main>
    </div>
  );
}
