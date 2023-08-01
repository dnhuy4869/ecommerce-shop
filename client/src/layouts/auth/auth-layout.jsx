import { Box, Grid, styled } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom"
import MainCard from "@components/main-card";
import { useAuth } from "@features/auth";
import { useEffect } from "react";

const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
}));

const AuthCard = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);

export const AuthLayout = () => {

    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    // If user is logged in, nagivate to public route
    useEffect(() => {
        if ((isAuthenticated())) {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <AuthWrapper>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCard>
                                    <Outlet />
                                </AuthCard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        {/* AuthFooter */}
                    </Grid>
                </Grid>
            </AuthWrapper>
        </>
    )
}