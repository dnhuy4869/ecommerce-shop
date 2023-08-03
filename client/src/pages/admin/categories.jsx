import { PageLayout } from "@components/page-layout";
import { Outlet } from "react-router-dom";

export const CategoryPage = () => {
    return (
        <>
            <PageLayout title="Loại hàng">
                <Outlet />
            </PageLayout>
        </>
    )
}