import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Graneles from "./pages/graneles/Graneles";
import GranelesDetail from "./pages/granelesDatail/GranelesDetail";
import NotFound from "./components/notFound/NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [expiredCount, setExpiredCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  const handleLoginSuccess = (userName) => {
    setIsAuthenticated(true);
    setLoggedUser(userName);
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedUser("");
  };

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route element={<Layout onLogout={handleLogout} loggedUser={loggedUser} expiredCount={expiredCount} activeCount={activeCount}/>}>
            <Route path="/" element={<Orders setExpiredCount={setExpiredCount} setActiveCount={setActiveCount} loggedUser={loggedUser}/>} />
            <Route path="/granel" element={<NotFound />} />
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
