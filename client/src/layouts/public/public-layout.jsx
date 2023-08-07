import { Box, Button, Container, styled } from "@mui/material"
import { Link, Outlet } from "react-router-dom"
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: "84px",
    minHeight: "initial",
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }
            : {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }
    ),
}));

export const PublicLayout = () => {
    return (
        <>
            <Header />

            <Main>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Main>

            <Footer />
        </>
    )
}