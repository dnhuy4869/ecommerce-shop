import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpened } from "./admin-layout.slice";
import { DRAWER_WIDTH } from "./admin-layout.constants";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar/sidebar";
import { useAuth } from "@features/auth";
import { useEffect } from "react";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }
            : {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(DRAWER_WIDTH - 20),
        width: `calc(100% - ${DRAWER_WIDTH}px)`
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

export const AdminLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const leftDrawerOpened = useSelector(state => state.adminLayout.isSidebarOpened);
    const dispatch = useDispatch();

    const handleLeftDrawerToggle = () => {
        dispatch(setSidebarOpened(!leftDrawerOpened));
    };

    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    // If user is not logged in, nagivate to auth route
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/auth/login");
        }

        if (!user || !user.role !== "admin") {
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>

                {/* Header */}
                <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />

                {/* Sidebar */}
                <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

                {/* Main content */}
                <Main theme={theme} open={leftDrawerOpened}>
                    <Outlet />
                </Main>

            </Box>
        </>
    )
}