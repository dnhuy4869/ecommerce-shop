import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        selectedCategory: "",
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    }
})

export const { setSelectedCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;