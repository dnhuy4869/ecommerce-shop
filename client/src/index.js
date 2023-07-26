import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme()}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);