import { configureStore } from "@reduxjs/toolkit";
import adminSidebarReducer from "../features/adminSidebarSlice";

const store = configureStore({
    reducer: {
        adminSidebar: adminSidebarReducer,
    }
});

export default store;