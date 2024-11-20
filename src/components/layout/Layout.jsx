import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Greeting from "../greeting/Greeting";

const Layout = ({ onLogout, loggedUser, expiredCount, activeCount}) => {
  return (
    <div>
      <Navbar onLogout={onLogout} loggedUser={loggedUser} expiredCount={expiredCount} activeCount={activeCount} />
      <Greeting loggedUser={loggedUser} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
