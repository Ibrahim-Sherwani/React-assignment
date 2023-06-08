import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <BaseUser />,
//     children: [
//       {
//         element: <Navbar />,
//         children: [
//           {
//             path: "/posts",
//             element: <PostsContainer />,
//           },
//           {
//             path: "/posts/:postId",
//             element: <PostPage />,
//           },
//         ],
//       },
//     ],
//   },
//   { path: "/login", element: <LoginPage />, children: [{}] },
//   { path: "/signup", element: <SignupPage />, children: [{}] },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
