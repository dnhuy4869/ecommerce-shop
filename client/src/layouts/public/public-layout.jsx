import { Button } from "@mui/material"
import { Link } from "react-router-dom"

export const PublicLayout = () => {
    return (
        <>
            <Link to="/admin">
                <Button variant="outlined" sx={{
                    textTransform: 'initial'
                }}>Admin</Button>
            </Link>
        </>
    )
}