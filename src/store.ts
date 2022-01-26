import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import { createInjectorsEnhancer } from 'redux-injectors';

import createReducer from './root-reducer';

import { push, routerMiddleware } from 'connected-react-router';
import history from './history';

let store: ReturnType<typeof configureAppStore>;

function configureAppStore (initialState = {}) {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    const { run: runSaga } = sagaMiddleware;

    let middlewares;

    if (process.env.NODE_ENV !== 'production') {
        middlewares = [
            sagaMiddleware,
            reduxLogger
        ];
    } else {
        middlewares = [
            sagaMiddleware,
        ];
    }

    const enhancers = [
        applyMiddleware(
            routerMiddleware(history()),
        ),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    const store = configureStore({
        reducer: createReducer(),
        middleware: [
            ...middlewares,
        ],
        preloadedState: initialState,
        devTools: process.env.NODE_ENV !== 'production',
        enhancers,
    });

    return store;
}

const getStore = (initialState = {}) => {
    if (store) {
        return store;
    }

    store = configureAppStore(initialState);
    return store;
};

export function navigate(path: string) {
    store.dispatch(push(path))
}

export default getStore;
