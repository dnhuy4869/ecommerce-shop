import { createSlice } from "@reduxjs/toolkit";

const isCartExist = (cart, idProduct) => {
    const cartItemIndex = cart.findIndex((cartItem) => cartItem.idProduct === idProduct);
    return cartItemIndex !== -1;
}

const findCartIndex = (cart, idProduct) => {
    return cart.findIndex((cartItem) => cartItem.idProduct === idProduct);
}

const removeItemInCart = (cart, idProduct) => {
    const cartItemIndex = cart.findIndex((cartItem) => cartItem.idProduct === idProduct);
    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        isCheckout: false,
    },
    reducers: {
        addToCart: (state, action) => {

            const newItem = action.payload;
            const cart = state.cart;

            // check if item already exist
            if (!cart.length <= 0
                && isCartExist(cart, newItem.idProduct)) {

                const index = findCartIndex(cart, newItem.idProduct);
                cart[index].amount += newItem.amount;
                cart[index].totalPrice = cart[index].price * cart[index].amount;

                state.cart = cart;
                return;
            }

            cart.push({
                idProduct: newItem.idProduct,
                name: newItem.name,
                imageUrl: newItem.imageUrl,
                price: newItem.price,
                amount: newItem.amount,
                totalPrice: newItem.price * newItem.amount,
            })

            state.cart = cart;
            return;
        },
        removeFromCart: (state, action) => {

            const idProduct = action.payload;
            const cart = state.cart;

            removeItemInCart(cart, idProduct);

            state.cart = cart;
            return;
        },
        increaseAmountInCart: (state, action) => {

            const cart = state.cart;
            const idProduct = action.payload.idProduct;
            const amountToIncrease = action.payload.amountToIncrease;

            if (cart.length <= 0
                || !isCartExist(cart, idProduct)) {

                state.cart = cart;
                return;
            }

            const index = findCartIndex(cart, idProduct);
            cart[index].amount += amountToIncrease;
            cart[index].totalPrice = cart[index].price * cart[index].amount;

            state.cart = cart;
            return;
        },
        decreaseAmountInCart: (state, action) => {

            const cart = state.cart;
            const idProduct = action.payload.idProduct;
            const amountToDecrease = action.payload.amountToDecrease;

            if (cart.length <= 0
                || !isCartExist(cart, idProduct)) {

                state.cart = cart;
                return;
            }

            const index = findCartIndex(cart, idProduct);

            cart[index].amount -= amountToDecrease;
            if (cart[index].amount < 0) {
                cart[index].amount = 0;
            }

            cart[index].totalPrice = cart[index].price * cart[index].amount;

            state.cart = cart;
            return;
        },
        clearCart: (state, action) => {
            state.cart = [];
        },
    }
})

export const {
    addToCart,
    removeFromCart,
    increaseAmountInCart,
    decreaseAmountInCart,
    clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;