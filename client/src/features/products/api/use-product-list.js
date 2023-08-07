import { useEffect, useState } from "react"
import { useProductCrud } from "./use-product-crud";

export const useProductList = (idCategory = undefined) => {

    const { getAllProducts, getProductsByCategory } = useProductCrud();

    const [originalList, setOriginalList] = useState([]);
    const [productList, setProductList] = useState([]);

    async function fetchData(id) {
        let resData = null;

        if (!id || id === "") {
            resData = await getAllProducts();
        }
        else {
            resData = await getProductsByCategory(id);
        }

        if (!resData.isSuccess) {
            return;
        }

        const newData = resData.response.map((product, index) => {
            return {
                id: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price.toString(),
            }
        })

        setOriginalList(newData);
        setProductList(newData);
    }

    useEffect(() => {
        fetchData(idCategory);
    }, []);

    const refetchProductList = (id) => {
        fetchData(id);
    }

    const deleteIdInList = (id) => {

        setOriginalList((prevData) => {
            return prevData.filter((obj) => obj.id !== id);
        });

        setProductList((prevData) => {
            return prevData.filter((obj) => obj.id !== id);
        });
    }

    const deleteIdsInList = (ids) => {
        setOriginalList((prevData) => {
            return prevData.filter((obj) => !ids.includes(obj.id));
        });

        setProductList((prevData) => {
            return prevData.filter((obj) => !ids.includes(obj.id));
        });
    }

    return {
        originalList,
        productList,
        refetchProductList,
        setProductList,
        deleteIdInList,
        deleteIdsInList
    };
}