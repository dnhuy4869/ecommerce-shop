import { AdminLayout } from "@layouts/admin/admin-layout";
import { CategoryPage } from "@pages/admin/categories";
import { ProductPage } from "@pages/admin/products";

export const adminRoutes = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            path: "categories",
            element: <CategoryPage />
        },
        {
            path: "products",
            element: <ProductPage />
        },
    ]
}