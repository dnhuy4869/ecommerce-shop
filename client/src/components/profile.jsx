import { Avatar, Box, Chip, Divider, List, ListItemButton, ListItemIcon, ListItemText, Menu, Stack, Typography, useTheme } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import User1 from '@assets/profile-default.png';
import { useState } from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from "@features/auth";
import { useNavigate } from "react-router-dom";

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

    const logout = async () => {
        await logoutUser();

        nagivate("/auth/login");
    }

    const buttons = [
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
    ]

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
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        color="inherit"
                    />
                }
                label={<SettingsOutlinedIcon stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
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
                            <Typography variant="h4">Xin chào,</Typography>
                            <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                Ngọc Huy
                            </Typography>
                        </Stack>
                        <Typography variant="subtitle2">Quản trị viên</Typography>
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