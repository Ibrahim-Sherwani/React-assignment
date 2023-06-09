import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import * as CryptoJS from "crypto-js";

import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import PostsPage from "./PostsPage";
import PostDetailPage from "./PostDetailPage";
import { Navbar } from "./components/navbar";
import { SECRET_KEY, TOKEN } from "./components/constants";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN));
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);

  function updateToken() {
    setToken(localStorage.getItem(TOKEN));
  }
  function getUser() {
    if (token) {
      const bytes = CryptoJS.AES.decrypt(JSON.parse(token), SECRET_KEY);
      const decodedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decodedToken;
    }
  }

  useEffect(() => {
    if (token) {
      const bytes = CryptoJS.AES.decrypt(JSON.parse(token), SECRET_KEY);
      const decodedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setUser(decodedToken);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setIsUser(true);
    }
  }, [user]);

  function handleLogout() {
    localStorage.removeItem(TOKEN);
    setUser(null);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isUser ? (
                <Navigate replace to={"/posts"} />
              ) : (
                <Navigate replace to={"/login"} />
              )
            }
          />
          <Route
            path="posts"
            element={
              <>
                <Navbar handleLogout={handleLogout} />{" "}
                <PostsPage getUser={getUser} />
              </>
            }
          />
          <Route
            path="posts/:postId"
            element={
              <>
                <Navbar handleLogout={handleLogout} />{" "}
                <PostDetailPage getUser={getUser} />
              </>
            }
          />
          <Route
            path="login"
            element={<LoginPage updateToken={updateToken} user={user} />}
          />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
