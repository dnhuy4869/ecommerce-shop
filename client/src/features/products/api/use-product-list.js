import { useEffect, useState } from "react"
import { useProductCrud } from "./use-product-crud";

export const useProductList = () => {

    const { getAllProducts } = useProductCrud();

    const [originalList, setOriginalList] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resData = await getAllProducts();
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

        fetchData();
    }, []);

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
        originalList, productList, 
        setProductList, deleteIdInList, deleteIdsInList
     };
}