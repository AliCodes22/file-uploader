import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Router } from "react";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import UserContextProvider from "../context/UserContext.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/drive",
        element: <App />,
        index: true,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
