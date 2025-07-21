import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import UserContextProvider from "../context/UserContext.jsx";
import Welcome from "../pages/Welcome.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Drive from "../pages/Drive.jsx";
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
    element: <ProtectedRoute />,

    children: [
      {
        element: <App />,
        path: "/",
        children: [
          {
            path: "",
            element: <Drive />,
          },
        ],
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
