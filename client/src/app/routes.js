import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/admin";
import Categories from "../views/admin/Categories";
import Products from "../views/admin/Products";

const router = createBrowserRouter([
    {
        path: "/",
        exact: true,
        element: <></>,
    },
    {
        path: "/login",
        element: <></>,
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
]);

export default router;