import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/admin";
import Categories from "../views/admin/Categories";
import Products from "../views/admin/Products";
import NotFound from "../views/NotFound";
import AuthLayout from "../layout/auth";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

const router = createBrowserRouter([
    {
        path: "/",
        exact: true,
        element: <></>,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "products",
                element: <Products />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;