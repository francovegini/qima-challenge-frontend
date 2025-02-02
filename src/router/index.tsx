import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Products from "../pages/products/list";
import PrivateRouteGuard from "../guards/private-route-guard.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRouteGuard />,
    children: [
      {
        path: "",
        element: <Products />
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
