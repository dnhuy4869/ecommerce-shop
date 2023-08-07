import { AdminLayout } from "@layouts/admin/admin-layout";
import { CategoryPage } from "@pages/admin/categories";
import { ProductPage } from "@pages/admin/products";
import { AdminCategoryList } from "@features/categories/components/admin-category-list";
import { CategoryAdd } from "@features/categories/components/category-add";
import { CategoryEdit } from "@features/categories/components/category-edit";
import { ProductAdd } from "@features/products/components/product-add";
import { ProductEdit } from "@features/products/components/product-edit";
import { AdminProductList } from "@features/products/components/admin-product-list";

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
                    element: <AdminCategoryList />,
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
                    element: <AdminProductList />,
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