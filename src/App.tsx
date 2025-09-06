import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/index"; 
import Register from "./pages/Register";
import AskExperts from "./pages/AskExperts";

export default function App() {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Routes>
      
      <Route path="/" element={<Login />} />

      
      <Route
        path="/home"
        element={isLoggedIn ? <Index /> : <Navigate to="/" />}
      />
      
      <Route path="/register" element={<Register />} />
      <Route path="/ask" element={<AskExperts />} />
      

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
