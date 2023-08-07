import { Avatar, Box, Chip, Divider, List, ListItemButton, ListItemIcon, ListItemText, Menu, Stack, Typography, useTheme } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import User1 from '@assets/profile-default.png';
import { useMemo, useState } from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from "@features/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetLayout } from "@layouts/admin";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

export const Profile = () => {
    const theme = useTheme();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { user, logoutUser } = useAuth();

    const nagivate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        await logoutUser();

        dispatch(resetLayout());

        nagivate("/");
    }

    const getRole = () => {
        if (!user || !user.role) {
            return "";
        }

        switch (user.role) {
            case "customer":
                return "Khách hàng";
            case "admin":
                return "Quản trị viên";
            default:
                return "Khách hàng";
        }

        return "";
    }

    const buttons = useMemo(() => {

        const adminButtons = [
            {
                icon: <PersonOutlineOutlinedIcon />,
                text: "Tài khoản",
                href: "/",
                onClick: () => { }
            },
            {
                icon: <LogoutOutlinedIcon />,
                text: "Đăng xuất",
                href: "/",
                onClick: () => { logout() }
            },
        ];

        if (user && user.role === "admin") {
            adminButtons.unshift({
                icon: <AdminPanelSettingsOutlinedIcon />,
                text: "Bảng điều khiển",
                href: "/admin",
                onClick: () => { }
            },);
        }

        return user ? adminButtons : ([
            {
                icon: <PersonOutlineOutlinedIcon />,
                text: "Đăng nhập",
                href: "/auth/login",
                onClick: () => { }
            },
            {
                icon: <HowToRegOutlinedIcon />,
                text: "Đăng ký",
                href: "/auth/register",
                onClick: () => { }
            },
        ])
    }, [user]);

    const renderAvatarIcon = (color) => {
        return user ? (
            <SettingsOutlinedIcon color={color} />
        ) : (
            <LoginIcon color={color} />
        )
    };

    const renderWelcomeMessage = () => {
        return user ? (
            <>
                <Typography variant="h4">Xin chào,</Typography>
                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                    {user ? user.fullName : ""}
                </Typography>
            </>
        ) : (
            <Typography variant="h4">Đăng nhập / Đăng ký</Typography>
        )
    }

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    cursor: 'pointer',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0,
                        paddingLeft: 1,
                    }
                }}
                icon={
                    <Avatar
                        src={user ? user.imageUrl : User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        color="inherit"
                    />
                }
                label={renderAvatarIcon(theme.palette.primary.main)}
                variant="outlined"
                color="primary"
                onClick={handleOpenUserMenu}
            />
            <Menu
                sx={{
                    mt: '55px',
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Box sx={{ paddingX: 2, paddingY: 1.5 }}>
                    <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            {renderWelcomeMessage()}
                        </Stack>
                        <Typography variant="subtitle2">
                            {getRole()}
                        </Typography>
                    </Stack>
                </Box>
                <Divider />
                <List
                    component="nav"
                    sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                            mt: 0.5
                        },
                        paddingX: 1.5,
                    }}>
                    {buttons.map((button, index) => (
                        <ListItemButton
                            key={index}
                            component={Link}
                            to={button.href}
                            onClick={() => {
                                button.onClick();
                                handleCloseUserMenu();
                            }}
                            sx={{ borderRadius: `12px` }}
                        >
                            <ListItemIcon>
                                {button.icon}
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">{button.text}</Typography>} />
                        </ListItemButton>
                    ))}
                </List>
            </Menu>
        </>
    )
}