import { PageLayout } from "@components/page-layout";
import { CartList } from "../../features/cart/components/cart-list";

export const CartPage = () => {
    return (
        <>
            <PageLayout title="Giỏ hàng">
                <CartList />
            </PageLayout>
        </>
    )
}