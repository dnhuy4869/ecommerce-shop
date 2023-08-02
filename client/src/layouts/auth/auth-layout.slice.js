import { createSlice } from "@reduxjs/toolkit";

const authLayoutSlice = createSlice({
    name: "authLayout",
    initialState: {
        isRegisterRedirect: false,
    },
    reducers: {
        setRegisterRedirect: (state, action) => {
            state.isRegisterRedirect = action.payload;
        }
    }
})

export const { setRegisterRedirect } = authLayoutSlice.actions;
export const authLayoutReducer = authLayoutSlice.reducer;