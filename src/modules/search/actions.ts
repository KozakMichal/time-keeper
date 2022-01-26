import * as constants from './constants';

export const changeSearchDebounced = (newSearch: string) => ({
    type: constants.CHANGE_SEARCH_DEBOUNCED,
    payload: newSearch,
});

export const changeSearch = (newSearch: string) => ({
    type: constants.CHANGE_SEARCH,
    payload: newSearch.toLowerCase(),
});
