import { PageLayout } from "@components/page-layout";
import { Outlet } from "react-router-dom";

export const ProductPage = () => {
    return (
        <>
            <PageLayout title="Sản phẩm">
                <Outlet />
            </PageLayout>
        </>
    )
}