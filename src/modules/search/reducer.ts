import * as constants from './constants';

export interface SearchReducerState {
    search: string;
};

const getInitialState = () => ({
    search: '',
});

const SearchReducer = (
    state = getInitialState(),
    action: any
): SearchReducerState => {
    switch (action.type) {
        case constants.CHANGE_SEARCH:
            return {
                ...state,
                search: action.payload,
            };
        default:
            return state;
    }
};

export default SearchReducer;
