import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { AppRoutes } from './app/routes';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './app/theme';
import store from "./app/store";
import { Provider } from 'react-redux';
import { Layout } from './components/layout';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme()}>
                <SnackbarProvider anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                    <BrowserRouter>
                        <Layout>
                            <CssBaseline />
                            <AppRoutes />
                        </Layout>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
