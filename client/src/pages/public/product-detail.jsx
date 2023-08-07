import { PageLayout } from "@components/page-layout";
import { Box } from "@mui/material";
import { ProductDetail } from "@features/products/components/product-detail";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {

    const { id } = useParams();

    return (
        <>
            <PageLayout title="Chi tiết sản phẩm">
                <ProductDetail />
            </PageLayout>
        </>
    )
}