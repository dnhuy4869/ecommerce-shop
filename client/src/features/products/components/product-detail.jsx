import { Box, useTheme } from "@mui/material"

export const ProductDetail = ({ id }) => {

    const theme = useTheme();

    return (
        <>
            <Box sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
            }}>
                Chi tiết sản phẩm
            </Box>
        </>
    )
}