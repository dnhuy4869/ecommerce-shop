import { PublicLayout } from "@layouts/public";
import { HomePage } from "@pages/public/home";
import { ProductPage } from "@pages/public/products";
import { AboutPage } from "@pages/public/about";

export const publicRoutes = {
    path: '/',
    element: <PublicLayout />,
    children: [
        {
            path: '',
            element: <HomePage />,
        },
        {
            path: '/products',
            element: <ProductPage />,
        },
        {
            path: '/about',
            element: <AboutPage />,
        },
    ]
};