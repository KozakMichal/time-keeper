import { debounce, put } from '@redux-saga/core/effects';
import { changeSearch, changeSearchDebounced } from './actions';
import * as constants from './constants';

function* handleChangeSearch(action: ReturnType<typeof changeSearchDebounced>) {
    yield put(changeSearch(action.payload));
}

function* actionWatcher() {
    yield debounce(200, constants.CHANGE_SEARCH_DEBOUNCED, handleChangeSearch);
};

export default actionWatcher;
