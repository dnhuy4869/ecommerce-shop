import { configureStore } from "@reduxjs/toolkit";
import { adminLayoutReducer } from "@layouts/admin";
import { authReducer } from "@features/auth";
import { authLayoutReducer } from "@layouts/auth";

const store = configureStore({
    reducer: {
        adminLayout: adminLayoutReducer,
        auth: authReducer,
        authLayout: authLayoutReducer,
    }
});

export default store;