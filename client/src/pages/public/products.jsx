import { PageLayout } from "@components/page-layout";
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, FormControl, Grid, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { PublicCategoryList } from "@features/categories/components/public-category-list";
import { PublicProductList } from "@features/products/components/public-product-list";

const LEFT_SIDEBAR_WIDTH = 260;

export const ProductPage = () => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            <PageLayout title="Sản phẩm">
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                }}>

                    {/* Categories */}
                    <PublicCategoryList width={LEFT_SIDEBAR_WIDTH} />

                    {/* Products */}
                    <PublicProductList sidebarWidth={LEFT_SIDEBAR_WIDTH} />

                </Box>
            </PageLayout>
        </>
    )
}