import { createSlice } from "@reduxjs/toolkit";

const adminSidebarSlice = createSlice({
    name: "adminSidebar",
    initialState: {
        isOpened: true,
        selectedMenu: '',
    },
    reducers: {
        setSidebarOpened: (state, action) => {
            state.isOpened = action.payload;
        },
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
        }
    }
})

export const { setSidebarOpened, setSelectedMenu } = adminSidebarSlice.actions;
export default adminSidebarSlice.reducer;