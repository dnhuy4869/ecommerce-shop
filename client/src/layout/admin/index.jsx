import { AppBar, Box, Toolbar } from '@mui/material';
import Header from "./Header";
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <>
            <Box>

                {/* Header */}
                <Header />

                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <Box>
                    <Outlet />
                </Box>

            </Box>
        </>
    )
}

export default AdminLayout;