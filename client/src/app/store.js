import { configureStore } from "@reduxjs/toolkit";
import { adminLayoutReducer } from "@layouts/admin";
import { authReducer } from "@features/auth";
import { authLayoutReducer } from "@layouts/auth";
import { categoryReducer } from "@features/categories/category.slice";
import { cartReducer } from "@features/cart/cart.slice";

const store = configureStore({
    reducer: {
        adminLayout: adminLayoutReducer,
        auth: authReducer,
        authLayout: authLayoutReducer,
        category: categoryReducer,
        cart: cartReducer,
    }
});

export default store;