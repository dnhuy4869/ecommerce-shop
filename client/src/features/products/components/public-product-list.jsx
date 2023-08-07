import laptopAsus from "@assets/latop-asus.webp"
import { Box, Card, CardActionArea, CardContent, CardMedia, FormControl, Grid, InputAdornment, MenuItem, OutlinedInput, Select, Typography, useTheme } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useProductList } from "@features/products/api/use-product-list";
import formatter from "@utils/formatter";
import { API_URL } from "@app/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PublicProductList = ({sidebarWidth}) => {

    const theme = useTheme();

    const selectedCategory = useSelector((state) => state.category.selectedCategory);

    const { originalList, productList, refetchProductList, setProductList } = useProductList();

    useEffect(() => {
        refetchProductList(selectedCategory);

    }, [selectedCategory]);

    const [keyword, setKeyword] = useState('');

    const handleSearchInput = (e) => {

        const key = e.target.value;
        setKeyword(key);

        const searchData = originalList.filter(item => item.name.includes(key));
        setProductList(searchData);
    }

    return (
        <Box sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            width: `calc(100% - ${sidebarWidth}px)`,
            [theme.breakpoints.down('md')]: {
                width: '100%',
            }
        }}>
            <Grid container spacing={2} sx={{
                padding: 2,
                marginTop: 0.2,
                marginBottom: 1,
            }}>
                <Grid item xs={12} lg={7}>
                    <OutlinedInput
                        type="text"
                        value={keyword}
                        onChange={handleSearchInput}
                        sx={{
                            minWidth: '90%',
                            background: "#fff",
                            "& input": {
                                backgroundColor: "#fff",
                            },
                            [theme.breakpoints.down('lg')]: {
                                minWidth: '100%',
                            },
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        } />
                </Grid>

                <Grid item xs={12} lg={5}>
                    <FormControl sx={{
                        minWidth: '100%',
                        background: "#fff",
                        display: "flex",
                        alignItems: 'center',
                        flexDirection: "row",
                        gap: 1,
                        "& input": {
                            backgroundColor: "#fff",
                        },
                    }}>
                        <Typography variant="h5" sx={{
                            minWidth: "50px",

                        }}>Sắp xếp</Typography>
                        <Select
                            value={0}
                            variant="outlined"
                            sx={{
                                minWidth: 'calc(98% - 50px)',
                            }}
                        >
                            <MenuItem value={0}>Nổi bật</MenuItem>
                            <MenuItem value={1}>Tăng dần</MenuItem>
                            <MenuItem value={2}>Giảm dần</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container sx={{ p: 2 }} spacing={2}>
                {productList.map((product, index) => (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={3}>
                        <Card 
                        component={Link}
                        to={`/product-detail/${product.id}`}
                        sx={{
                            boxShadow: 2,
                            textDecoration: 'none',
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={`${API_URL}${product.imageUrl}`}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                    {formatter.toVndCurrency(product.price)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}