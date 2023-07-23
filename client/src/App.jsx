import React, { useState } from 'react';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from './pages/Register';
import AdminLayout from './layout/admin'
import Dashboard from "./views/admin/Dashboard";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        exact: true,
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);

const App = () => {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;