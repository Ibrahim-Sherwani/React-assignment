import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      <nav className="navbar navbar-dark bg-dark justify-content-end">
        <form className="form-inline">
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            style={{ marginRight: "20px" }}
            onClick={handleClick}
          >
            Log Out
          </button>
        </form>
      </nav>
    </div>
  );
};
