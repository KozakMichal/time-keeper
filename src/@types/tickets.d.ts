import 'react-redux';
import { TicketsReducerState } from '../modules/tickets/reducer';

declare module 'react-redux' {
    interface DefaultRootState {
        tickets?: TicketsReducerState;
    }
}
