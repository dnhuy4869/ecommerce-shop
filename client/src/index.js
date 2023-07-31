import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import store from "./app/store";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme()}>
                <BrowserRouter>
                    <CssBaseline />
                    <AppRoutes />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
