import NavBar from "./components/navbar/Navbar";
import Materials from "./pages/materials/Materials";
import { AuthContext } from "./components/contexts/authProvider/AuthProviderContext";
import { MaterialsUpdateProvider } from "./components/contexts/materialsUpdateContext/MaterialsUpdateContext";
import Auth from "./components/auth/Auth";
import AutoLogout from "./components/autoLogout/AutoLogout";
import { useContext } from "react";
import "./index.css";

function App() {
  const { user, loading, logout } = useContext(AuthContext);

  const handleLogout = () => {
    alert("Has sido desconectado por inactividad.");
    logout();
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return user ? (
    <MaterialsUpdateProvider>
      <NavBar />
      <Materials />
      <AutoLogout onLogout={handleLogout} timeout={600000} />
    </MaterialsUpdateProvider>
  ) : (
    <Auth />
  );
}

export default App;

