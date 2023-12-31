import { PageLayout } from "@components/page-layout";
import { Box } from "@mui/material";
import { ProductDetail } from "@features/products/components/product-detail";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export const ProductDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            enqueueSnackbar("Id không tồn tại", { variant: 'error' });
            navigate("/products");
        }
    }, [])

    return (
        <>
            <PageLayout title="Chi tiết sản phẩm">
                <ProductDetail id={id} />
            </PageLayout>
        </>
    )
}