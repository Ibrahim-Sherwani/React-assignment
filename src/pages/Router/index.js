import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignupPage from "../SignupPage";
import LoginPage from "../LoginPage";
import PostsPage from "../PostsPage";
import PostDetailPage from "../PostDetailPage";
import NavbarLayout from "../../layouts/header/navbar";

export default function RouterPage({
  isUser,
  getUser,
  user,
  handleLogout,
  updateToken,
}) {
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

          <Route element={<NavbarLayout handleLogout={handleLogout} />}>
            <Route path="posts" element={<PostsPage getUser={getUser} />} />
            <Route
              path="posts/:postId"
              element={<PostDetailPage getUser={getUser} />}
            />
          </Route>

          <Route
            path="login"
            element={<LoginPage updateToken={updateToken} user={user} />}
          />

          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}
