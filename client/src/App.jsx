import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import bgImage from './assets/bgImage.svg'; // or try with img1.jpg to test


const App = () => {
  return (
    <div className="h-screen bg-no-repeat bg-cover bg-[url('/src/assets/bgImage.svg')]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
