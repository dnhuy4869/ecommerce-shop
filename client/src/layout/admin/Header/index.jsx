import { AppBar, Avatar, Box, ButtonBase, Toolbar, useTheme } from '@mui/material';
import Logo from './Logo';
import MenuIcon from '@mui/icons-material/Menu';
import Notification from './Notification';
import Profile from './Profile';

const Header = () => {
    const theme = useTheme();

    return (
        <>
            <AppBar
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                }}>
                <Toolbar>
                    <Box
                        sx={{
                            width: 228,
                            display: 'flex',
                            [theme.breakpoints.down('md')]: {
                                width: 'auto'
                            }
                        }}
                    >
                        <Box component="span" sx={{
                            display: {
                                xs: 'none',
                                md: 'block'
                            },
                            flexGrow: 1
                        }}>
                            <Logo />
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "100%",
                    }}>
                        {/* header menu */}
                        <ButtonBase sx={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            marginLeft: "1rem",
                        }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    transition: 'all .2s ease-in-out',
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                onClick={() => { }}
                                color="inherit"
                            >
                                <MenuIcon stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>

                        {/* notification & profile */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Notification />
                            <Profile />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar >
        </>
    )
}

export default Header;