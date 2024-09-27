import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Graneles from "./pages/graneles/Graneles";
import GranelesDetail from "./pages/granelesDatail/GranelesDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<Orders />} />
            <Route path="/granel" element={<Graneles />} />
            <Route path="/graneles/:id" element={<GranelesDetail />} />
          </Route>
        ) : (
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
        )}
        <Route path="*" element={<Login onLogin={handleLoginSuccess} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

