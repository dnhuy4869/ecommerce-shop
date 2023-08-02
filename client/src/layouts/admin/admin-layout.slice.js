import { createSlice } from "@reduxjs/toolkit";

const adminLayoutSlice = createSlice({
    name: "adminLayout",
    initialState: {
        isSidebarOpened: true,
        selectedMenu: '',
    },
    reducers: {
        setSidebarOpened: (state, action) => {
            state.isSidebarOpened = action.payload;
        },
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
        resetLayout: (state, action) => {
            state.isSidebarOpened = true;
            state.selectedMenu = '';
        }
    }
})

export const { setSidebarOpened, setSelectedMenu, resetLayout } = adminLayoutSlice.actions;
export const adminLayoutReducer = adminLayoutSlice.reducer;