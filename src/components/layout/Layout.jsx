import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Greeting from "../greeting/Greeting"; // Asegúrate de importar Greeting

const Layout = ({ onLogout, loggedUser}) => {
  return (
    <div>
      <Navbar onLogout={onLogout} loggedUser={loggedUser} />
      <Greeting loggedUser={loggedUser} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
