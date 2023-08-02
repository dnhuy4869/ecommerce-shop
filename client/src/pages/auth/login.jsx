import { Alert, Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from "@features/auth/components/login-form";
import { PageLayout } from "@components/page-layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterRedirect } from "@layouts/auth";

export const LoginPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const dispath = useDispatch();

    const [registerMessage, setRegisterMessage] = useState(null);
    const isRegisterRedirect = useSelector(state => state.authLayout.isRegisterRedirect);

    useEffect(() => {
        if (isRegisterRedirect) {
            dispath(setRegisterRedirect(false));
            setRegisterMessage(" Đăng ký thành công.");
        }
    }, []);

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
                    {
                        registerMessage && (
                            <Grid item xs={12}>
                                <Alert severity="success" color="success" sx={{ fontWeight: 500 }}>
                                    {registerMessage}
                                </Alert>
                            </Grid>
                        )
                    }

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