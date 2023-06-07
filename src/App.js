import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import * as CryptoJS from 'crypto-js'

import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import PostsPage from './PostsPage';
import PostPage from './PostPage';
import { Navbar } from './components/navbar'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const secretKey = '3C5AD5695D1E5FA9A9771F9597913'

  function updateToken() {
    setToken(localStorage.getItem('token'))
  }
  function getUser() {
    return user
  }

  useEffect(() => {
    if (token) {
      const bytes = CryptoJS.AES.decrypt(JSON.parse(token), secretKey);
      const decodedToken = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setUser(decodedToken);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user]);



  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
  };


  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isUser ? <Navigate replace to={"/posts"} /> : <Navigate replace to={"/login"} />}
          />
          <Route
            path="posts"
            element={<><Navbar handleLogout={handleLogout} />   <PostsPage getUser={getUser} /></>}
          />
          <Route
            path="posts/:postId"
            element={<><Navbar handleLogout={handleLogout} />    <PostPage user={user} /></>}
          />
          <Route
            path="login"
            element={<LoginPage updateToken={updateToken} secretKey={secretKey} user={user} />}
          />
          <Route
            path="signup"
            element={<SignupPage />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
