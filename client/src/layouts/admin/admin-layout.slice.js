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
        }
    }
})

export const { setSidebarOpened, setSelectedMenu } = adminLayoutSlice.actions;
export const adminLayoutReducer = adminLayoutSlice.reducer;