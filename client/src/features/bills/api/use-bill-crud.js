import { apiGet, apiPost, apiPut, apiDelete } from "@lib/axios";

export const useBillCrud = () => {

    const getBillById = async (id) => {
        return await apiGet(`/bill/get-by-id/${id}`);
    }

    const addBill = async (data) => {
        return await apiPost(`/bill/add`, data);
    }

    return {
        getBillById,
        addBill,
    };
}