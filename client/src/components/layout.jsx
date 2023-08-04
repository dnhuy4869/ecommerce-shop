import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "@features/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@features/auth";
import { resetLayout } from "@layouts/admin";

export const Layout = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { logoutUser } = useAuth();

    useEffect(() => {
        const currUser = localStorage.getItem('user');
        if (currUser) {
            dispatch(setUser(JSON.parse(currUser)));
        }
    }, []);

    useEffect(() => {
        const handleRefreshTokenFailed = async () => {

            await logoutUser();
            dispatch(resetLayout());

            localStorage.removeItem("user");
            dispatch(setUser(null));
            navigate('/auth/login');
        };

        window.addEventListener('refreshTokenFailed', handleRefreshTokenFailed);

        return () => {
            window.removeEventListener('refreshTokenFailed', handleRefreshTokenFailed);
        };
    }, []);

    return (
        <>
            {children}
        </>
    )
}