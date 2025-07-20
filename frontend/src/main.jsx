import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import UserContextProvider from "../context/UserContext.jsx";
import Welcome from "../pages/Welcome.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/drive",
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
