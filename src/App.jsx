import NavBar from "./components/navbar/Navbar";
import Materials from "./pages/materials/Materials";
import { MaterialsUpdateProvider } from "./components/contexts/MaterialsUpdateContext"; // Asegúrate de que este sea el path correcto
import "./index.css";

function App() {
  return (
    <MaterialsUpdateProvider>
      <NavBar />
      <Materials />
    </MaterialsUpdateProvider>
  );
}

export default App;
