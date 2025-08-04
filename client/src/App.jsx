import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import bgImage from "./assets/bgImage.svg"; // or try with img1.jpg to test
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="h-screen bg-no-repeat bg-cover bg-[url('/src/assets/bgImage.svg')]">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
