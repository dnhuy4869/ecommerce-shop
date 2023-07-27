import { Divider, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import AuthCard from './AuthCard';
import { Link } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <AuthWrapper>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCard>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item xs={12}>
                                            <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center">
                                                        <VpnKeyIcon color="secondary" sx={{
                                                            fontSize: '3.5rem',
                                                        }}/>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LoginForm />
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

export default Login;