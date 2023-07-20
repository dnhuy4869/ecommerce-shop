import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import {
    Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia,
    Container, FormControl, Grid, Input, InputAdornment, InputLabel,
    MenuItem, Select, Typography
} from "@mui/material";
import productLogo from "../assets/product-logo.webp"
import laptopAsus from "../assets/latop-asus.webp"
import { grey } from "@mui/material/colors";
import { Search } from "@mui/icons-material";

const Products = () => {
    return (
        <>
            <Header />

            <Box sx={{
                backgroundColor: grey[200],
                paddingBottom: 2,
            }}>
                <Container maxWidth="lg" >
                    <Breadcrumbs />
                </Container>

                {/* Logo */}
                <Container maxWidth="lg" >
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                        }}
                        alt="product-logo"
                        src={productLogo}
                    />
                </Container>

                <Container maxWidth="lg" sx={{
                    marginTop: 2,
                }}>
                    <Box sx={{
                        backgroundColor: "white",
                        padding: 1,
                    }}>
                        <Grid container spacing={2} sx={{ padding: 2 }}>
                            <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 2 }}>
                                <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">Tìm kiếm</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 2 }}>
                                <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Loại hàng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="category"
                                    >
                                        <MenuItem value={1}>Latop</MenuItem>
                                        <MenuItem value={2}>Bàn phím</MenuItem>
                                        <MenuItem value={3}>Tai nghe</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 2 }}>
                                <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="sort"
                                    >
                                        <MenuItem value={0}>Nổi bật</MenuItem>
                                        <MenuItem value={1}>Tăng dần</MenuItem>
                                        <MenuItem value={2}>Giảm dần</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                        {/* Products */}
                        <Grid container sx={{ p: 2 }} spacing={2}>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                image={laptopAsus}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    Laptop Asus VivoBook 14 OLED M1405YA KM047W
                                                </Typography>
                                                <Typography variant="body1" color="primary">
                                                    16.990.000đ
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>

            <Footer />
        </>
    )
}

export default Products;