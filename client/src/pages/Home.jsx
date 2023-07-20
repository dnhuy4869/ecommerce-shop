import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import {
    Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia,
    Container, FormControl, Grid, Input, InputAdornment, InputLabel,
    MenuItem, Select, Typography
} from "@mui/material";
import homeLogo from "../assets/home-logo.webp"
import homeLogo2 from "../assets/home-logo-2.webp"
import homeLogo3 from "../assets/home-logo-3.webp"
import homeLogo4 from "../assets/home-logo-4.webp"
import laptopAsus from "../assets/latop-asus.webp"
import { grey } from "@mui/material/colors";
import { Search } from "@mui/icons-material";

const Home = () => {
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
                            height: 450,
                        }}
                        alt="product-logo"
                        src={homeLogo}
                    />

                    <Grid container spacing={2} sx={{
                        marginY: 0.1
                    }}>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                sx={{
                                    width: "100%",
                                }}
                                alt="product-logo"
                                src={homeLogo2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                sx={{
                                    width: "100%",
                                }}
                                alt="product-logo"
                                src={homeLogo3}
                            />
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="lg" sx={{
                    marginTop: 2,
                }}>
                    <Box sx={{
                        backgroundColor: "white",
                        padding: 1,
                    }}>
                        <Box sx={{ paddingX: 2, pt: 1 }}>
                            <Typography variant="h5" color="primary">Laptop bán chạy</Typography>
                        </Box>

                        {/* Products */}
                        <Grid container sx={{ p: 2 }} spacing={2}>
                            {Array.from({ length: 4 }).map((_, index) => (
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

                <Container maxWidth="lg" sx={{
                    marginTop: 2,
                }}>
                    <Box sx={{
                        backgroundColor: "white",
                        padding: 1,
                    }}>
                        <Box sx={{ paddingX: 2, pt: 1 }}>
                            <Typography variant="h5" color="primary">Tai nghe bán chạy</Typography>
                        </Box>

                        {/* Products */}
                        <Grid container sx={{ p: 2 }} spacing={2}>
                            {Array.from({ length: 4 }).map((_, index) => (
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

                <Container maxWidth="lg" sx={{ mt: 2 }} >
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                            height: 300,
                        }}
                        alt="product-logo"
                        src={homeLogo4}
                    />
                </Container>
            </Box>

            <Footer />
        </>
    )
}

export default Home;