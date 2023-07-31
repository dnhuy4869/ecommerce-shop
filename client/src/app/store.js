import { configureStore } from "@reduxjs/toolkit";
import { adminLayoutReducer } from "@layouts/admin";

const store = configureStore({
    reducer: {
        adminLayout: adminLayoutReducer,
    }
});

export default store;