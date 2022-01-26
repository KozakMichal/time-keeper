import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import configureStore from './store';

import { router as Router } from './routes';

import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './containers/layout';

const store = configureStore({});

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />

        <Provider store={store}>
            <Layout>
                <Router />
            </Layout>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
