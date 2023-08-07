import { PageLayout } from "@components/page-layout";
import { CartCheckout } from "@features/cart/components/cart-checkout";

export const CheckoutPage = () => {
    return (
        <>
            <PageLayout title="Thanh toán">
                <CartCheckout />
            </PageLayout>
        </>
    )
}