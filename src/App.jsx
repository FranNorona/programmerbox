import { useState } from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Orders from "./components/orders/Orders";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <Orders />
        </Layout>
      ) : (
        <Login onLogin={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
