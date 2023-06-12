import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navbar/index";

const NavbarLayout = ({ handleLogout }) => (
  <>
    <Navbar handleLogout={handleLogout} />
    <Outlet />
  </>
);

export default NavbarLayout;
