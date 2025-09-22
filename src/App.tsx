// App.tsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Login from "./pages/Login";
import Index from "./pages/index";
import Register from "./pages/Register";
import AskExperts from "./pages/AskExperts";
import Mandi from "./pages/Mandi";
import WeatherPage from "./pages/Weather";
import { AiPage } from "./pages/AiPage";
import CropRecommendation from "./components/CropRecommendation";


export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={user ? <Index /> : <Navigate to="/" />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
        <Route path="/ai" element={user ? <AiPage /> : <Navigate to="/" />} />
        <Route path="/ask" element={user ? <AskExperts /> : <Navigate to="/" />} />
        <Route path="/mandi" element={user ? <Mandi /> : <Navigate to="/" />} />
        <Route path="/weather" element={user ? <WeatherPage /> : <Navigate to="/" />} />
        <Route
  path="/reco"
  element={user ? <CropRecommendation/> : <Navigate to="/" />}
/>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
