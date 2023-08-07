import { PageLayout } from "@components/page-layout";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BillDetail } from "@features/bills/components/bill-detail"

export const BillDetailPage = () => {

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
            <PageLayout title="Chi tiết hóa đơn">
                <BillDetail id={id} />
            </PageLayout>
        </>
    )
}