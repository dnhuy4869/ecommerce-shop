import { useEffect } from "react"

export const PageLayout = ({children, title}) => {
    
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}