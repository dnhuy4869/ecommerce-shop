import { styled } from "@mui/material";
import { Outlet } from "react-router-dom"

const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
}));

export const AuthLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}