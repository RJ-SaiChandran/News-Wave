import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Article from "./components/Article";
import SavedArticles from "./components/SavedArticle";
import SignUp from "./components/signUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/article/:name",
    element: <Article />,
  },
  {
    path: "/get-saved-articles",
    element: <SavedArticles />,
  },
  {
    path: "/userRegister",
    element: <SignUp />,
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);
