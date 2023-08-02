import { PageLayout } from "@components/page-layout";
import { CategoryList } from "@features/categories";

export const CategoryPage = () => {
    return (
        <>
            <PageLayout title="Loại hàng">
                <CategoryList />
            </PageLayout>
        </>
    )
}