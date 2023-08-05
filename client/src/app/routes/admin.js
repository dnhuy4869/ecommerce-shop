import { AdminLayout } from "@layouts/admin/admin-layout";
import { CategoryPage } from "@pages/admin/categories";
import { ProductPage } from "@pages/admin/products";
import { CategoryList } from "@features/categories";
import { CategoryAdd } from "@features/categories/components/category-add";
import { CategoryEdit } from "@features/categories/components/category-edit";
import { ProductList } from "@features/products";
import { ProductAdd } from "@features/products/components/product-add";
import { ProductEdit } from "@features/products/components/product-edit";

export const adminRoutes = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            path: "categories",
            element: <CategoryPage />,
            children: [
                {
                    path: "",
                    element: <CategoryList />,
                },
                {
                    path: "add",
                    element: <CategoryAdd />,
                },
                {
                    path: "edit/:id",
                    element: <CategoryEdit />,
                },
            ],
        },
        {
            path: "products",
            element: <ProductPage />,
            children: [
                {
                    path: "",
                    element: <ProductList />,
                },
                {
                    path: "add",
                    element: <ProductAdd />,
                },
                {
                    path: "edit/:id",
                    element: <ProductEdit />,
                },
            ]
        },
    ]
}