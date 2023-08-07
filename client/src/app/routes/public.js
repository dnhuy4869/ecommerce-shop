import { PublicLayout } from "@layouts/public";
import { HomePage } from "@pages/public/home";
import { ProductPage } from "@pages/public/products";
import { AboutPage } from "@pages/public/about";
import { ProductDetailPage } from "@pages/public/product-detail";
import { CartPage } from "@pages/public/cart";
import { CheckoutPage } from "@pages/public/checkout";
import { BillDetailPage } from "@pages/public/bill-detail";

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
        {
            path: '/product-detail/:id',
            element: <ProductDetailPage />,
        },
        {
            path: '/cart',
            element: <CartPage />,
        },
        {
            path: "checkout",
            element: <CheckoutPage />,
        },
        {
            path: "bill-detail/:id",
            element: <BillDetailPage />,
        },
    ]
};