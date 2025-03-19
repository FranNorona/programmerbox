import NavBar from "./components/navbar/Navbar";
import Materials from "./pages/materials/Materials";
import { AuthContext, AuthProviderContext } from "./components/contexts/authProvider/AuthProviderContext";
import { MaterialsUpdateProvider } from "./components/contexts/materialsUpdateContext/MaterialsUpdateContext";
import Auth from "./components/auth/Auth";
import { useContext } from "react";
import "./index.css";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Cargando...</p>
  }

  return user ? (
    <MaterialsUpdateProvider>
      <NavBar />
      <Materials />
    </MaterialsUpdateProvider>
  ) : (
    <Auth />
  );
}

export default App;
