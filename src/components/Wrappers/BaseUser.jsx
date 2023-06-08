import { Outlet, useNavigate } from "react-router-dom";

const BaseUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  return token ? <Outlet /> : navigate("/login");
};

export default BaseUser;
