import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import * as CryptoJS from "crypto-js";
import { SECRET_KEY, TOKEN } from "./components/constants";

const LoginPage = ({ updateToken, user }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [email]);

  useEffect(() => {
    if (user) navigate("/posts");
  }, [user]);

  const handleClick = () => navigate("/signup");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isInStorage = JSON.parse(localStorage.getItem(email));
    if (
      isInStorage &&
      (await bcrypt.compare(password, isInStorage.hashedPassword))
    ) {
      const payload = { name: isInStorage.name, email };

      const token = CryptoJS.AES.encrypt(
        JSON.stringify(payload),
        SECRET_KEY
      ).toString();

      localStorage.setItem(TOKEN, JSON.stringify(token));

      updateToken();
      navigate("/");
      return;
    }
    setError(true);
  };

  return (
    <div>
      <section className="py-4 py-xl-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>Login</h2>
              <p></p>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div className="card mb-5">
                <div
                  className="card-body d-flex flex-column align-item-center"
                  style={{
                    marginBottom: "-1px",
                    marginTop: "50px",
                    paddingTop: "53px",
                    paddingBottom: "86px",
                  }}
                >
                  {error && <h4>Invalid Credentials</h4>}
                  <form className="text-center" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-100"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-100 text-align-center"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-primary w-100" type="submit">
                        LogIn
                      </button>
                      <button
                        className="btn btn-primary w-100"
                        onClick={handleClick}
                        style={{ marginTop: "10px" }}
                      >
                        {" "}
                        Go To SignUp Page
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
