import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import { Box, Container } from "@mui/material";

const Home = () => {
    return (
        <>
            <Header />

            <Box>
                <Container maxWidth="lg">
                    <Breadcrumbs />
                </Container>
            </Box>

            <Footer />
        </>
    )
}

export default Home;