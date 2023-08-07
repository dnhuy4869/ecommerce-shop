import { configureStore } from "@reduxjs/toolkit";
import { adminLayoutReducer } from "@layouts/admin";
import { authReducer } from "@features/auth";
import { authLayoutReducer } from "@layouts/auth";
import { categoryReducer } from "@features/categories/category.slice";

const store = configureStore({
    reducer: {
        adminLayout: adminLayoutReducer,
        auth: authReducer,
        authLayout: authLayoutReducer,
        category: categoryReducer,
    }
});

export default store;