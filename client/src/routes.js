import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/admin";

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
            
        ],
    },
]);

export default router;