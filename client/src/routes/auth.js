import { AuthLayout } from "../layouts/auth";
import { LoginPage } from "@pages/auth/login";
 
export const authRoutes = {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: "login",
            element: <LoginPage />
        },
    ]
};