import 'react-redux';
import { SearchReducerState } from '../modules/search/reducer';

declare module 'react-redux' {
    interface DefaultRootState {
        search?: SearchReducerState;
    }
}
