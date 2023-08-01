import { Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from "@features/auth/components/login-form";
import { PageLayout } from "@components/page-layout";

export const LoginPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

    const onLoginSucces = () => {
        navigate("/");
    }

    return (
        <>
            <PageLayout title="Đăng nhập">
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                        <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                            <Grid item>
                                <Stack alignItems="center" justifyContent="center">
                                    <VpnKeyIcon color="secondary" sx={{
                                        fontSize: '3.5rem',
                                    }} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <LoginForm onSuccess={onLoginSucces} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item container direction="column" alignItems="center" xs={12}>
                            <Typography component={Link} to="/auth/register" variant="subtitle1" sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: "underline",
                                },
                            }}>
                                Bạn chưa có tài khoản?
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </PageLayout>
        </>
    )
}