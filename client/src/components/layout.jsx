import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "@features/auth";

export const Layout = ({children}) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        const currUser = localStorage.getItem('user');
        if (currUser) {
            dispatch(setUser(JSON.parse(currUser)));
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}