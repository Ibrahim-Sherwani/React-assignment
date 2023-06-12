import React, { useState, useEffect } from "react";

import * as CryptoJS from "crypto-js";

import RouterPage from "./pages/Router";
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
    <RouterPage
      isUser={isUser}
      getUser={getUser}
      user={user}
      handleLogout={handleLogout}
      updateToken={updateToken}
    />
  );
};

export default App;
