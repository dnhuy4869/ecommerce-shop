import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h1" color="secondary" sx={{
                    fontSize: "10rem",
                }} >
                    404
                </Typography>
                <Link to="/">
                <Button variant="outlined" sx={{
                    textTransform: 'initial'
                }}>Quay về trang chủ</Button>
                </Link>
                
            </Box>
        </>
    )
}

export default NotFound;