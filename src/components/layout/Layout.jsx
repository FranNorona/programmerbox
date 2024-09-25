import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Layout = ({ onLogout }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
