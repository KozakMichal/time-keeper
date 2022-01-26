import 'react-redux';
import { WorkspacesReducerState } from '../modules/workspaces/reducer';

declare module 'react-redux' {
    interface DefaultRootState {
        workspaces?: WorkspacesReducerState;
    }
}
