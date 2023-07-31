import { useRoutes } from "react-router-dom";
import { authRoutes } from "./auth";
import NotFound from "../pages/not-found";

const notFound = {
    path: '*',
    element: <NotFound />,
};

export const AppRoutes = () => {
    return useRoutes([authRoutes, notFound]);
}