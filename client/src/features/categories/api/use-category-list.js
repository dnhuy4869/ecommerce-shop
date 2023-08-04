import { useEffect, useState } from "react"
import { useCategoryCrud } from "./use-category-crud";

export const useCategoryList = () => {

    const { getAllCategories } = useCategoryCrud();

    const [originalList, setOriginalList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const resData = await getAllCategories();
            if (!resData.isSuccess) {
                return;
            }

            const newData = resData.response.map((category, index) => {
                return {
                    id: category._id,
                    name: category.name,
                    imageUrl: category.imageUrl,
                }
            })

            setOriginalList(newData);
            setCategoryList(newData);
        }

        fetchData();
    }, []);

    const deleteIdInList = (id) => {

        setOriginalList((prevData) => {
            return prevData.filter((obj) => obj.id !== id);
        });

        setCategoryList((prevData) => {
            return prevData.filter((obj) => obj.id !== id);
        });
    }

    const deleteIdsInList = (ids) => {
        setOriginalList((prevData) => {
            return prevData.filter((obj) => !ids.includes(obj.id));
        });
    
        setCategoryList((prevData) => {
            return prevData.filter((obj) => !ids.includes(obj.id));
        });
    }

    return { 
        originalList, categoryList, 
        setCategoryList, deleteIdInList, deleteIdsInList
     };
}