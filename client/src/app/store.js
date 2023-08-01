import { configureStore } from "@reduxjs/toolkit";
import { adminLayoutReducer } from "@layouts/admin";
import { authReducer } from "../features/auth/auth.slice";

const store = configureStore({
    reducer: {
        adminLayout: adminLayoutReducer,
        auth: authReducer,
    }
});

export default store;