import { Computer } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, ButtonBase, Container, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material"
import { useMemo, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { Logo } from "@components/logo";
import { Notification } from "@components/notification";
import { Profile } from "@components/profile";

export const Header = () => {

    const theme = useTheme();

    const pages = useMemo(() => [
        {
            displayName: 'Trang chủ',
            href: "/",
        },
        {
            displayName: 'Sản phẩm',
            href: "/products",
        },
        {
            displayName: 'Giới thiệu',
            href: "/about",
        },
    ], []);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                bgcolor: theme.palette.background.default,
                transition: theme.transitions.create('width'),
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Mobile layout */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Logo icon={<Computer />} text="Computer" />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <ButtonBase
                            sx={{
                                borderRadius: '12px',
                                overflow: 'hidden',
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
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon />
                            </Avatar>
                        </ButtonBase>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography
                                        component={Link}
                                        to={page.href}
                                        color="secondary"
                                        sx={{
                                            textDecoration: 'none',
                                            paddingY: 1,
                                        }}>
                                        {page.displayName}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop layout */}

                    <Box sx={{
                        flexGrow: 1,
                        ml: 5,
                        display: { xs: 'none', md: 'flex' }
                    }}>
                        {pages.map((page, index) => (
                            <Button
                                component={Link}
                                to={page.href}
                                key={index}
                                onClick={handleCloseNavMenu}
                                color="secondary"
                                sx={{
                                    display: 'block',
                                    fontSize: "1.0rem",
                                    fontWeight: 600,
                                }}
                            >
                                {page.displayName}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{
                        flexGrow: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Notification />
                        <Profile />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}