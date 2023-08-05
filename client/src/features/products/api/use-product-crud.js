import { apiGet, apiPost, apiPut, apiDelete } from "@lib/axios";

export const useProductCrud = () => {

    const getAllProducts = async () => {
        return await apiGet(`/product/get-all`);
    }

    const getProductById = async (id) => {
        return await apiGet(`/product/get-by-id/${id}`);
    }

    const addProduct = async (data) => {
        return await apiPost(`/product/add`, data);
    }

    const editProduct = async (id, data) => {
        return await apiPut(`/product/edit/${id}`, data);
    }

    const deleteProduct = async (id) => {
        return await apiDelete(`/product/delete/${id}`);
    }

    const deleteMultipleProducts = async (data) => {
        return await apiPost(`/product/delete-multiple`, data);
    }

    const uploadProductImage = async (id, image) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('id', id);

        return await apiPost(`/product/upload-image`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    return {
        getAllProducts, 
        getProductById,
        addProduct,
        editProduct, 
        deleteProduct,
        deleteMultipleProducts,
        uploadProductImage,
    };
}