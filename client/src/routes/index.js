import { useRoutes } from "react-router-dom";
import { authRoutes } from "./auth";
import NotFound from "../pages/not-found";
import { adminRoutes } from "./admin";
import { publicRoutes } from "./public";

const notFound = {
    path: '*',
    element: <NotFound />,
};

export const AppRoutes = () => {
    return useRoutes([authRoutes, publicRoutes, adminRoutes, notFound]);
}