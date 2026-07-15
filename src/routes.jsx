import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import NoPage from "./pages/404/404.jsx";
import ForgotPassword from "./pages/forgotPassword/forgotPassword.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx"

import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/forgot",
        element: <ForgotPassword />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "*",
        element: <NoPage />,
    }
]);

export default router;
