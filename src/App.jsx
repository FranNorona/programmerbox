import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Graneles from "./pages/graneles/Graneles";
import GranelesDetail from "./pages/granelesDatail/GranelesDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState(""); // Nuevo estado para el usuario logueado

  const handleLoginSuccess = (userName) => {
    setIsAuthenticated(true);
    setLoggedUser(userName);
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedUser(""); // Limpiar el nombre de usuario al cerrar sesión
  };

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route element={<Layout onLogout={handleLogout} loggedUser={loggedUser} />}>
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
};

export default App;
