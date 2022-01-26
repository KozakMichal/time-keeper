import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router';

import history from './history';

export let rootReducerInstance: ReturnType<typeof createReducer>;

export let rootReducer = {
    router: connectRouter(history()),
};

const createReducer = (injectedReducers = {}) => {
    return combineReducers({
        ...injectedReducers,
        ...rootReducer,
    });
};

const bootstrapCreateReducer = (injectedReducers = {}) => createReducer(injectedReducers);

export default bootstrapCreateReducer;
