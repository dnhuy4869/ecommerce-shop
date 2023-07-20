import { AppBar, Box, Toolbar } from '@mui/material';
import React from 'react';
import Header from "./Header";
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <>
            <Box>

                {/* Header */}
                <AppBar>
                    <Toolbar>
                        <Header />
                    </Toolbar>
                </AppBar>

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