import { AppBar, Box, Toolbar, styled, useMediaQuery, useTheme } from '@mui/material';
import Header from "./Header";
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOpened } from '../../features/adminSidebarSlice';
import { drawerWidth } from '../../app/constant';

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
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

const AdminLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const leftDrawerOpened = useSelector(state => state.adminSidebar.isOpened);
    const dispatch = useDispatch();

    const handleLeftDrawerToggle = () => {
        dispatch(setSidebarOpened(!leftDrawerOpened));
    };

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

export default AdminLayout;