import { apiGet, apiPost, apiPut, apiDelete } from "@lib/axios";

export const useCategoryCrud = () => {

    const getAllCategories = async () => {
        return await apiGet(`/category/get-all`);
    }

    const getCategoryById = async (id) => {
        return await apiGet(`/category/get-by-id/${id}`);
    }

    const addCategory = async (data) => {
        return await apiPost(`/category/add`, data);
    }

    const editCategory = async (id, data) => {
        return await apiPut(`/category/edit/${id}`, data);
    }

    const deleteCategory = async (id) => {
        return await apiDelete(`/category/delete/${id}`);
    }

    const deleteMultipleCategories = async (data) => {
        return await apiPost(`/category/delete-multiple`, data);
    }

    const uploadCategoryImage = async (id, image) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('id', id);

        return await apiPost(`/category/upload-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    return {
        getAllCategories, 
        getCategoryById,
        addCategory,
        editCategory, 
        deleteCategory,
        deleteMultipleCategories,
        uploadCategoryImage,
    };
}