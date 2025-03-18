import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import CitiesPage from './components/CitiesPage/CitiesPage';
import MainPage from "./components/MainPage/MainPage";
import Parcels from "./components/Parcels/Parcels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/parcels" element={<Parcels />} /> 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;