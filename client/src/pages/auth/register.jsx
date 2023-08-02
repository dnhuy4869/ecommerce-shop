import { Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from "@features/auth/components/register-form";
import { PageLayout } from "@components/page-layout";
import { setRegisterRedirect } from "@layouts/auth";
import { useDispatch } from "react-redux";

export const RegisterPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();
    const dispath = useDispatch();

    const onRegisterSucces = () => {
        dispath(setRegisterRedirect(true));
        navigate("/auth/login");
    }

    return (
        <>
            <PageLayout title="Đăng ký">
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
                        <RegisterForm onSuccess={onRegisterSucces} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item container direction="column" alignItems="center" xs={12}>
                            <Typography component={Link} to="/auth/login" variant="subtitle1" sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: "underline",
                                },
                            }}>
                                Bạn đã có tài khoản?
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </PageLayout>
        </>
    )
}