import { AppBar, Avatar, Box, ButtonBase, Toolbar, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { DRAWER_WIDTH } from "../admin-layout.constants";
import { Profile } from './profile';
import { Logo } from "../logo";
import { Notification } from "./notification";

export const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    const leftDrawerOpened = useSelector(state => state.adminLayout.isSidebarOpened);

    return (
        <>
            <AppBar
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}>
                <Toolbar>
                    <Box
                        sx={{
                            width: `calc(${DRAWER_WIDTH}px - 1rem)`,
                            display: 'flex',
                            [theme.breakpoints.down('md')]: {
                                width: 'auto'
                            },
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block'
                                },
                                flexGrow: 1,
                                width: `calc(${DRAWER_WIDTH}px - 1rem)`,
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
                            [theme.breakpoints.up('md')]: {

                            }
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
                                color="inherit"
                                onClick={handleLeftDrawerToggle}
                            >
                                <MenuIcon />
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